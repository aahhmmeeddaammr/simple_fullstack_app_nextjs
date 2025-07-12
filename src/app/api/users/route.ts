import connectToDb from "@/lib/DB/connectio";
import UserModel from "@/lib/DB/models/User.Model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDb();
    const users = await UserModel.find({});
    return NextResponse.json({ message: "Done", data: users });
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
