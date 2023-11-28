const mongoose = require('mongoose');

const grouppostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      title: {
        type: String,
        required: true,
      },

      content: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  images: [
    {
      type: String,
    },
  ],
  applicants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      isApproved: {
        type: Boolean,
        default: false,
      },
      additionalField: {
        type: String,
        default: '',
      },
    },
  ],
});

const groupPost = mongoose.model('groupPost', grouppostSchema);
module.exports = { groupPost };