const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PetOwnerSchema = new Schema({
  username: {
    type: "String",
    requried: true,
    unique: true
  },
  email: {
    type: "String",
    required: true,
    unique: true
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
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
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
      color: String,
      photoURL: String
    }
  ],
  posts: [
    {
      body: {
        type: String,
        required: true
      },
      imageURL: String,
      publishDate: {
        type: Date,
        required: true
      }
    }
  ],
  phone: {
    type: String,
    minLength: 11,
    maxLength: 11
  }
});

PetOwnerSchema.plugin(uniqueValidator);

module.exports = model("pet_owner", PetOwnerSchema);
