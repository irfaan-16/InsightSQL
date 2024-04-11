import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/database/mongo";
import Section from "@/lib/models/Section";
export async function POST(req: NextRequest, res: NextResponse) {
  await connect();
  const { title, desc, snippetTitle, snippetDesc, snippet, note } =
    await req.json();

  const newSection = await Section.create({
    title,
    desc,
    snippetTitle,
    snippetDesc,
    snippet,
    note,
  });
  return new Response(JSON.stringify(newSection), { status: 200 });
}
