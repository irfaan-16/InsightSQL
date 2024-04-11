import mongoose, { Model, Schema, mongo } from "mongoose";
export interface TopicDocument extends Document {
  title: string;
  name: string;
  language: string;
  sections: [mongoose.Types.ObjectId];
}

//title->SQL AND Operator
const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  sections: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Section" }],
  },
});

let TopicModel: Model<TopicDocument>;

if (mongoose.models.Topic) {
  TopicModel = mongoose.model<TopicDocument>("Topic");
} else {
  TopicModel = mongoose.model<TopicDocument>("Topic", topicSchema);
}

export default TopicModel;
