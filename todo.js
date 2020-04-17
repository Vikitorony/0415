const express = require('express');
const app = express();
const todos = [];
let todoIndex = 0;

const rootHandler = (req, res) => {
  console.log(req.params, req.query);
  res.json({ status: 'ok', id: req.params.id });
};

const todoIndexHandler = (req, res) => { // /todos GET
  res.json(todos);
};

const todoCreateHandler = (req, res) => { // /todos POST
  console.log(req.body);
  const todo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    author: 'anonymous'
  };
  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

const todoShowHandler = (req, res) => { // /todos/:id GET
  for (const todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      res.json(todos[req.params.id]);
      return res.json(todo); // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
  }
  res.json({});
};

const todoUpdateHandler = (req, res) => { // /todos/:id PUT
  for (const todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      todo.name = req.body.name; // ha nem adunk meg új nevet, akkor felülírja undefined-dal
      todo.description = req.body.description;
      todo.status = req.body.status;
      return res.status(203).json(todo);
    }
  }
  return res.status(200).json({});
};

const todoDeleteHandler = (req, res) => { // /todos/:id DELETE
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === parseInt(req.params.id)) {
      todos.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};

app.use(express.json());
app.get('/', rootHandler);
app.get('/todos', todoIndexHandler); // /todos GET
app.post('/todos', todoCreateHandler); // /todos POST
app.get('/todos/:id', todoShowHandler); // /todos/:id GET
app.put('/todos/:id', todoUpdateHandler); // /todos/:id PUT
app.delete('/todos/:id', todoDeleteHandler); // /todos/:id DELETE

app.listen(3030);
