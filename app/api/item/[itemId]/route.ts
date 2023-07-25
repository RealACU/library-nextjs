import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  itemId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { itemId } = params;

  if (!itemId || typeof itemId !== "string") {
    throw new Error("Invalid ID");
  }

  await prisma.item.delete({ where: { id: itemId } });

  return NextResponse.json({ status: 200 });
}
