import prisma from "@/libs/prismadb";

export default async function getItems() {
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeItems = items.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      visible: true,
    }));

    return safeItems;
  } catch (error: any) {
    throw new Error(error);
  }
}
