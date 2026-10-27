const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// 미들웨어
app.use(cors());
app.use(express.json());

// 인메모리 임시 데이터 (또는 DB 연결)
let todos = [
  { id: 1, text: 'React 공부하기', status: false },
  { id: 2, text: 'Express 서버 연동하기', status: true }
];

// 1. 전체 목록 조회 (GET)
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// 2. 항목 추가 (POST)
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: Date.now(),
    text,
    status: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 3. 상태 변경/수정 (PUT)
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo =>
    todo.id === Number(id) ? { ...todo, status: !todo.status } : todo
  );
  res.status(200).json({ message: '수정 완료' });
});

// 4. 삭제 (DELETE)
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== Number(id));
  res.status(200).json({ message: '삭제 완료' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});