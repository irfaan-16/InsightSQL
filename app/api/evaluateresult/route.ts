import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/utils/pool";

export async function POST(req: NextRequest, res: NextResponse) {
  const { query1, query2 } = await req.json();
  let result: Boolean = false;
  const result1 = await executeQuery(query1);
  const result2 = await executeQuery(query2);

  if (JSON.stringify(result1) === JSON.stringify(result2)) {
    result = true;
  } else {
    console.log(result1, result2);
  }
  return new Response(
    JSON.stringify({
      result: result2,
      expected: result1,
      isCorrectQuery: result,
    }),
    { status: 200 }
  );
}
