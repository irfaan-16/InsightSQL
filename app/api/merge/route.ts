import TopicModel from "@/lib/models/Topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { sectionId, topicId } = await req.json();
  const topic = await TopicModel.findByIdAndUpdate(topicId, {
    $push: { sections: sectionId },
  });
  return new Response(JSON.stringify(topic), { status: 200 });
}
