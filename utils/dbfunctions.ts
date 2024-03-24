import sql from "../lib/database/neon";
import Question from "@/lib/models/Question";
import connect from "@/lib/database/mongo";

export async function getQuestions() {
  await connect();
  const questions = await Question.find({});
  return questions;
}

export async function getQuestionById(id: string) {
  await connect();
  const question = await Question.findById({ _id: id });
  return question;
}

export async function compareQueries(q1: string, q2: string) {
  const output1 = await sql`${q1}`;
  const output2 = await sql`${q2}`;
  console.log(`Output 1: ${output1}`);
  console.log(`Output 2: ${output2}`);
  return output1 === output2;
}
