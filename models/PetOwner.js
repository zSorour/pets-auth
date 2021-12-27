const { Schema, model } = require("mongoose");

const PetOwnerSchema = Schema({
  username: {
    type: "String",
    requried: true
  },
  password: {
    type: "String",
    requried: true,
    select: false
  },
  name: {
    type: "String",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  pets: [
    {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      breed: String,
      age: Number,
      color: String
    }
  ],
  phone: {
    type: String,
    minLength: 11,
    maxLength: 11
  }
});

const PetOwner = model("pet_owner", PetOwnerSchema);

module.exports = PetOwner;
