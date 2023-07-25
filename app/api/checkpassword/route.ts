import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { value, hashedPassword } = body;

  const matches = await bcrypt.compare(value, hashedPassword);

  return NextResponse.json({ matches });
}
