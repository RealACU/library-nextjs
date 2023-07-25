import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    customId,
    title,
    description,
    iconName,
    imageSrc,
    url,
    trueUrl,
    password,
  } = body;

  let hashedPassword = "";
  if (password) {
    hashedPassword = await bcrypt.hash(password, 12);
  }

  const createdItem = await prisma.item.create({
    data: {
      customId,
      title,
      description,
      iconName,
      imageSrc,
      url,
      trueUrl,
      author: currentUser.name,
      hashedPassword,
    },
  });

  return NextResponse.json(createdItem);
}
