import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { isCuid } from "@paralleldrive/cuid2";

interface IParams {
  customId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { customId } = params;

  if (!customId || typeof customId !== "string") {
    throw new Error("Invalid ID");
  }

  if (!isCuid(customId)) {
    return NextResponse.error();
  }

  const hostItem = await prisma.item.findUnique({
    where: { customId },
    select: {
      trueUrl: true,
      hashedPassword: true,
      id: true,
      title: true,
      iconName: true,
      url: true,
    },
  });

  return NextResponse.json(hostItem);
}
