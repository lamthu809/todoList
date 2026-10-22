import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';
import path from "path"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:5173"}));

app.use(express.json());
app.use("/api/todos", taskRoutes);

if(process.env.NODE_ENV === 'production') {
  const disPath = path.join(import.meta.dirname, "../../frontend/dist");
  app.use(express.static(disPath));
  app.get("*splat", (req, res) => {
    res.sendFile(path.join(disPath, "index.html"));
  });
}
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


