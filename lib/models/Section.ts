import mongoose, { Model, Schema } from "mongoose";

export interface SectionDocument extends Document {
  title: string;
  desc: string;
  snippetTitle: string;
  snippetDesc: string;
  snippet: string;
  note: string;
}

const sectionSchema = new Schema<SectionDocument>({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  snippetTitle: {
    type: String,
  },
  snippetDesc: {
    type: String,
  },
  snippet: {
    type: String,
  },
  note: {
    type: String,
  },
});

let SectionModel: Model<SectionDocument>;
if (mongoose.models.Section) {
  SectionModel = mongoose.model<SectionDocument>("Section");
} else {
  SectionModel = mongoose.model<SectionDocument>("Section", sectionSchema);
}

export default SectionModel;
