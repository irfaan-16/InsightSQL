import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/utils/pool";

export async function POST(req: NextRequest, res: NextResponse) {
  const { query1, query2 } = await req.json();
  let result: Boolean = false;
  const result1 = await executeQuery(query1);
  const result2 = await executeQuery(query2);

  if (JSON.stringify(result1) === JSON.stringify(result2)) {
    result = true;
    console.log(result1, result2);
    console.log("Your ans is correct!!");
  } else {
    console.log(result1, result2);
    console.log("incorrect");
  }

  return new Response(JSON.stringify({ result }), { status: 200 });
}
