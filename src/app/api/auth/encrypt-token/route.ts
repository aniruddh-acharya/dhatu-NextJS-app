import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { encode } from "next-auth/jwt";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.NEXTAUTH_SECRET as string;
  const encryptedToken = await encode({
    token: session.user.token,
    secret
  });

  return NextResponse.json({ encryptedToken });
}
