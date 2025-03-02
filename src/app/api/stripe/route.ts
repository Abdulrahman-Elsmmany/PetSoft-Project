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
    console.log("Webhook verification failed", error);
    return Response.json(null, { status: 400 });
  }

  console.log("flufilling order");
  // fulfill the order
  switch (event.type) {
    case "checkout.session.completed":
      console.log("updating user access");
      console.log(event.data.object.customer_email);
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      console.log("user access updated");

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  //return 200 OK
  return Response.json(null, { status: 200 });
}
