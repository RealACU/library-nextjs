import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, secret } = body;

  const hashedSecret = await bcrypt.hash(secret, 12);

  const user = await prisma.user.create({
    data: {
      name,
      hashedSecret,
    },
  });

  return NextResponse.json(user);
}
