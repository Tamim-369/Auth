import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = await getDataFromToken(request);
    const user = await User.findById(token?.id).select("-password");
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: "User not found" });
  }
}
