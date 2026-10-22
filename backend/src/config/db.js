import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Khởi tạo Pool kết nối đến PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Kiểm tra kết nối khi khởi động
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Lỗi kết nối PostgreSQL:', err.message);
  }
  console.log('✅ Kết nối PostgreSQL thành công đến database:', process.env.DB_NAME);
  release(); // Giải phóng client trả về pool
});

export default pool;