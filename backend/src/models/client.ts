import { InferSchemaType, Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

type Client = InferSchemaType<typeof clientSchema>;

export default model<Client>("Client", clientSchema);
