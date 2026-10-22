const API_URL = 'http://localhost:3000/api/todos';

// 1. Lấy danh sách task từ backend
export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Lỗi lấy danh sách task');
  return await response.json();
};

// 2. Thêm task mới
export const createTaskApi = async (title, due_date) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, due_date }),
  });
  if (!response.ok) throw new Error('Lỗi khi thêm task');
  return await response.json();
};

// 3. Cập nhật task (đổi tên hoặc đổi status hoàn thành)
export const updateTaskApi = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Lỗi khi cập nhật');
  return await response.json();
};

// 4. Xóa task
export const deleteTaskApi = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Lỗi khi xóa');
  return await response.json();
};