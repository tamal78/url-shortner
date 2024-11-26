const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
