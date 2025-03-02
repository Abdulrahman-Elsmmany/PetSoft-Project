import prisma from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  //verify the webhook signature
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook verification failed", error);
    return Response.json(null, { status: 400 });
  }

  console.error("flufilling order");
  // fulfill the order
  switch (event.type) {
    case "checkout.session.completed":
      console.error("updating user access");
      console.error(event.data.object.customer_email);
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      console.error("user access updated");

      break;
    default:
      console.error(`Unhandled event type ${event.type}`);
  }

  //return 200 OK
  return Response.json(null, { status: 200 });
}
