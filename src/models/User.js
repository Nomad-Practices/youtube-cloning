import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  githubLoginOnly: {
    type: Boolean,
    default: false,
  },
  avatarUrl: {
    type: String,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

export default mongoose.model("User", userSchema);
