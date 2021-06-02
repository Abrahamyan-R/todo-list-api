import { Task } from '../models/Task.js';
import { pick } from '../helpers/functions.js';


export const createTask = async (req, res, next) => {
  const taskInfo = pick([
    'title',
    'date',
  ], req.body);

  taskInfo['user'] = req.user._id;

  try {
    await Task.create(taskInfo);

    const tasks = await Task.find({ user: req.user });

    res.status(201).json({
      success: true,
      list: tasks,
    });
  } catch (e) {
    next(e);
  }
};

export const getTasksList = async (req, res, next) => {
  const {
    skip = 0,
    limit = 10,
  } = req.query;

  try {
    const tasks = await Task
      .find({ user: req.user })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      list: tasks,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.deleteOne({
      _id: taskId,
      user: req.user
    });

    if (deletedTask.deletedCount == 0) {
      return res.status(400).json({
        success: false,
        error: "you don't have access",
      });      
    }

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
};