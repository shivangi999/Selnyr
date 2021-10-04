const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
    phone: { type: String },
    pofilePicture: { type: String },
    date: {
      type: Date,
      default: Date.now
    }
  });

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

// UserSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });
//
// UserSchema.methods = {
//   authenticate: async function (password) {
//     return await bcrypt.compare(password, this.hash_password);
//   },
// };

module.exports = User = mongoose.model("users", UserSchema);
