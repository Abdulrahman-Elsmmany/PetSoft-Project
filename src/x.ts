import prisma from "@/lib/db";

async function updateUserAccess() {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: "dex@gmail.com" },
      data: { hasAccess: true },
    });

    console.log("✅ User access updated:", updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error);
  }
}

updateUserAccess();
