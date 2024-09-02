const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  intro: { type: Boolean, default: false },
  color: { type: String, default: '#5B0D1F' },
  isLogoTexture: { type: Boolean, default: false },
  isFullTexture: { type: Boolean, default: false },
  position: { type: String, default: '360' },
  logoDecal: { type: String, default: '' },
  fullDecal: { type: String, default: '' },
  fullPaintDecal: { type: String, default: '' },
  leftFullDecal: { type: String, default: '' },
  size: { type: Number, default: 0 },
  mockupXposition: { type: Number, default: 0 },
  mockupYposition: { type: Number, default: 0 },
  mockupRotationFront: { type: Boolean, default: true },
  fullTextTexture: { type: String, default: '' },
});

module.exports = mongoose.model('Admin', adminSchema);
