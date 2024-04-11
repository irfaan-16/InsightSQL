import mongoose, { Document, Schema, Model } from "mongoose";

export interface QuestionDocument extends Document {
  title: String;
  description: [
    {
      groupTitle: String;
      groupTable: String;
      groupDesc: String;
    }
  ];
  task: String;
  examples: {
    input: { tableName: String; table: String }[];
    output: String;
    explanation: String;
  }[];
  difficulty: String;
  ans: String;
}

const questionSchema = new Schema<QuestionDocument>({
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true,
  },
  description: [
    {
      groupTitle: { type: String },
      groupTable: { type: String },
      groupDesc: { type: String },
    },
  ],
  difficulty: {
    type: String,
    required: true,
  },
  examples: [
    {
      input: [
        {
          tableName: { type: String, required: true },
          table: { type: String, required: true },
        },
      ],
      output: { type: String, required: true },
      explanation: { type: String, required: true },
    },
  ],
});

let QuestionModel: Model<QuestionDocument>;

if (mongoose.models.Question) {
  QuestionModel = mongoose.model<QuestionDocument>("Question");
} else {
  QuestionModel = mongoose.model<QuestionDocument>("Question", questionSchema);
}

export default QuestionModel;
