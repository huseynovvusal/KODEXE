import mongoose from "mongoose";

const { Schema } = mongoose;

const problemSchema = new Schema({
  name: { type: String, required: true },
  description: { tpye: String, required: true },
  score: { type: Number, default: 10 },
  examples: { type: Array, default: [] },
  image: { type: String, default: null },
  solutions: { type: Array, default: [] },
  discussion: { type: Array, default: [] },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
