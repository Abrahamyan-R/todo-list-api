import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }
});

const Task = mongoose.model('Task', TaskSchema);

export { Task };