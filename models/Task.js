const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Task title is required'], 
      trim: true, 
      minlength: [3, 'Title must be at least 3 characters'] 
    },
    description: { 
      type: String, 
      trim: true, 
      maxlength: [500, 'Description cannot exceed 500 characters'] 
    },
    category: { 
      type: String, 
      enum: ['work', 'personal', 'shopping', 'study', 'other'], 
      default: 'other' 
      // ✅ Keeps categories clean and consistent
    },
    deadline: { 
      type: Date, 
      validate: {
        validator: function (value) {
          return value >= new Date(); // deadline must be in the future
        },
        message: 'Deadline must be in the future',
      },
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    imageUrl: { 
      type: String, 
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/, 'Please use a valid image URL'] 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, 'Task must belong to a user'] 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
