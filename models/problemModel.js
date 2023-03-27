import mongoose from "mongoose";

const { Schema } = mongoose;

const problemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, default: "Asan" },
  score: { type: Number, default: 10 },
  examples: { type: Array, default: [] },
  image: { type: String, default: "" },
  solutions: { type: Array, default: [] },
  discussion: { type: Array, default: [] },
  constraints: { type: String, default: "Əlavə məhdudiyyət yoxdur." },
  testcases: { type: Array, required: true },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
