const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 인메모리 데이터베이스 (초기값)
let todos = [
  { id: 1, name: 'React 프로젝트 생성하기', status: 0 },
  { id: 2, name: 'Express 서버 구축하기', status: 1 },
  { id: 3, name: 'API 연동 테스트하기', status: 0 }
];

// 1. 할 일 목록 전체 조회
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// 2. 새 할 일 등록
app.post('/todos', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ message: '할 일 내용을 입력해주세요.' });
  }

  const newTodo = {
    id: Date.now(),
    name: name.trim(),
    status: 0 // 0: 미완료, 1: 완료
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 3. 할 일 상태 토글/수정 (완료 <-> 미완료)
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const target = todos.find(todo => todo.id === id);

  if (!target) {
    return res.status(404).json({ message: '해당 항목을 찾을 수 없습니다.' });
  }

  target.status = target.status === 1 ? 0 : 1;
  res.status(200).json(target);
});

// 4. 할 일 삭제
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = todos.some(todo => todo.id === id);

  if (!exists) {
    return res.status(404).json({ message: '해당 항목을 찾을 수 없습니다.' });
  }

  todos = todos.filter(todo => todo.id !== id);
  res.status(200).json({ message: '삭제 완료', id });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Express Todo Server is running on http://localhost:${PORT}`);
});