import connectToDb from "@/lib/DB/connectio";
import UserModel from "@/lib/DB/models/User.Model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDb();
    const { id } = await context.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: "in-valid account id" }, { status: 404 });
    }
    return NextResponse.json({ message: "Done", data: user });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
