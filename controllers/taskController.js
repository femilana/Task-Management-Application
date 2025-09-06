const Task = require('../models/Task');
const cloudinary = require('../utils/cloudinary');

// Create task (with optional image upload)
exports.createTask = async (req, res, next) => {
  const { title, description, category, deadline, completed } = req.body;
  try {
    let imageUrl = '';

    if (req.file) {
      // Upload directly from memory buffer
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer); // send buffer to cloudinary
      });

      imageUrl = result.secure_url;
    }

    const task = new Task({
      title,
      description,
      category,
      deadline,
      completed,
      imageUrl,
      user: req.user.id,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Get user's tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    let task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updates.imageUrl = result.secure_url;
    }

    task = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await Task.findByIdAndDelete(id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
