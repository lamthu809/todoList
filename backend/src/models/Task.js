// Nơi chứa hàm thực hiện câu lệnh
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient;

const Task = {
    getAllTasks: async () => {
        return await prisma.todos.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });
    },
    // Đã thêm tham số id vào hàm
    getById: async (id) => {
        return await prisma.todos.findUnique({
            where: {
                id: Number(id)
            },
        });
    },

    createTask: async (title, due_date) => {
        return await prisma.todos.create({
            data: {
                title: title,
                due_date: due_date ? new Date(due_date) : null,
                status: 'active',
            },
        });
    },

    updateTask: async (id, title, due_date, status) => {
        const completeAt = status === 'completed' ? new Date() : null;
        return await prisma.todos.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                due_date: due_date ? new Date(due_date) : null,
                status,
                complete_at: completeAt,
            },
        });
    },

    deleteTask: async (id) => {
        return await prisma.todos.delete({
            where: {
                id: Number(id)
            },
        });
    }

};

export default Task;
