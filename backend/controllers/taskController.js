const Task = require("../models/Task");

// create task
const createTask = async(req, res) => {
    try{
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
        });

        res.status(201).json(task);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

// get all tasks
const getTasks = async(req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

// update task
const updateTask = async(req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!task){
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json(task);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

// delete task
const deleteTask = async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
}