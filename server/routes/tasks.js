import express from 'express';
import Task from '../models/Task.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();



router.get('/', isAuthenticated, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.session.userId })
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error('Task fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
    });
  }
});



router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      userId: req.session.userId,
    });
    
    await task.save();
    
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Task creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating task',
    });
  }
});



router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const taskId = req.params.id;
    
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.session.userId },
      {
        title,
        description,
        status,
        dueDate,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Task update error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating task',
    });
  }
});



router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const taskId = req.params.id;
    
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.session.userId,
    });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Task deletion error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting task',
    });
  }
});

export default router;