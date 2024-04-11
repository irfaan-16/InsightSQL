import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/database/mongo";
import Topic from "@/lib/models/Topic";

export async function POST(req: NextRequest, res: NextResponse) {
  await connect();
  const { title, name, language } = await req.json();

  const newTopic = await Topic.create({ title, name, language });

  return new Response(JSON.stringify(newTopic), { status: 200 });
}
