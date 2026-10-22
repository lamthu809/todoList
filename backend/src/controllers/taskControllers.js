// Nơi chứa logic xử lý chính khi có yêu cầu gửi đến
import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, due_date } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Tiêu đề không được bỏ trống." });
        }
        const taskDueDate = due_date || null;

        const newTask = await Task.createTask(title, taskDueDate);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi gọi createTask:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, due_date, status } = req.body;

        // 1. Kiểm tra task có tồn tại không
        const existingTask = await Task.getById(id);
        if (!existingTask) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
        }

        // 2. Nếu trường nào không gửi lên thì giữ nguyên giá trị cũ
        const updatedTitle = title !== undefined ? title : existingTask.title;
        const updatedDueDate = due_date !== undefined ? due_date : existingTask.due_date;
        const updatedStatus = status !== undefined ? status : existingTask.status;
        if (updatedStatus && !['active', 'completed'].includes(updatedStatus)) {
    return res.status(400).json({ message: "Trạng thái chỉ được là 'active' hoặc 'completed'!" });
}
        // 3. Gọi hàm model cập nhật
        const updatedTask = await Task.updateTask(id, updatedTitle, updatedDueDate, updatedStatus);

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Lỗi khi gọi updateTask:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};
// Đã bổ sung hàm deleteTask để không bị lỗi crash server
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.deleteTask(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Nhiệm vụ không tồn tại để xóa!" });
        }

        res.status(200).json(deletedTask);

    } catch (error) {
        console.error("Lỗi khi gọi deleteTask:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

