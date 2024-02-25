import mongoose, { Model, Mongoose, Schema, mongo } from "mongoose";
import UserModel from "./User";
import Question from "./Question";

export interface SubmissionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  submissions: [
    {
      questionId: mongoose.Types.ObjectId;
      submittedQueries: [{ status: String; query: String }];
    }
  ];
}

const SubmissionSchema = new Schema<SubmissionDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  submissions: {
    type: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: Question,
          required: true,
        },
        submittedQueries: {
          type: [
            {
              status: { type: String, required: true },
              query: { type: String, required: true },
            },
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
});

let SubmissionModel: Model<SubmissionDocument>;
if (mongoose.models.Submission) {
  SubmissionModel = mongoose.model<SubmissionDocument>("Submission");
} else {
  SubmissionModel = mongoose.model<SubmissionDocument>(
    "Submission",
    SubmissionSchema
  );
}

export default SubmissionModel;
