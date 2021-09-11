const mongoose = require("mongoose");
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    vaccinated: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "PENDING",
      required: true,
      enum: ["ACCEPTED", "REJECTED", "PENDING"],
    },
    isAdopted: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamp: true }
);
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
