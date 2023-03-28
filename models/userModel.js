import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    verification: { type: Boolean, default: false },
    type: { type: String, default: "User" },
    solved_problems: { type: Array, default: [] },
    score: { type: Number, default: 0 },
    description: { type: String, default: "KODEXE çox maraqlıdır" },
    image: { type: String, default: "dafault-user.jpg" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model("User", userSchema);

export default User;
