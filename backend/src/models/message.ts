import { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: Number, required: true },
  },
  { timestamps: true }
);

type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Message", messageSchema);
