const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    desc: {
      type: Array,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    selled: {
      type: Number,
      default: 0,
    },
    img: {
      type: Array,
    },
    color: {
      type: String,
    },
    ratings: [
      {
        star: {
          type: Number,
        },
        voteBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
