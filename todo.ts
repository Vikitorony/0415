// const express = require('express'); // JavaScript import
import express, { Request, Response } from 'express'; // TypeScript import
const app = express();
const port = process.env.API_PORT || 3030;

interface ToDo {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'done';
  authorID: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
}

const todos: Array<ToDo> = [];
let todoIndex: number = 0;

const users: Array<User> = [];
let userIndex: number = 0;


const rootHandler = (req: Request, res: Response) => {
  console.log(req.params, req.query);
  res.json({ status: 'ok', id: req.params.id });
};

// todo
const todoIndexHandler = (req: Request, res: Response) => { // /todos GET
  res.json(todos);
};

const todoCreateHandler = (req: Request, res: Response) => { // /todos POST
  console.log(req.body);
  const todo: ToDo = {
    id: todoIndex,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    authorID: -1
  };

  todos.push(todo);
  todoIndex++;
  res.status(201).json(todo);
};

const todoShowHandler = (req: Request, res: Response) => { // /todos/:id GET
  for (const todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo); // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
  }
  res.json({});
};

const todoUpdateHandler = (req: Request, res: Response) => { // /todos/:id PUT
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

const todoDeleteHandler = (req: Request, res: Response) => { // /todos/:id DELETE
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === parseInt(req.params.id)) {
      todos.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};

// user
const userIndexHandler = (req: Request, res: Response) => { // /todos GET
  res.json(users);
};

const userCreateHandler = (req: Request, res: Response) => { // /users POST
  console.log(req.body);
  const user: User = {
    id: userIndex,
    username: req.body.username,
    email: req.body.email,
    role: 'user',
    password: req.body.password
  };

  users.push(user);
  userIndex++;
  res.status(201).json(user);
};

const userShowHandler = (req: Request, res: Response) => { // /users/:id GET
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      delete user.password; // lodash is használható
      console.log(users);
      return res.json(user); //vagy res.send(user) send // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
  }
  res.json({});
};

const userUpdateHandler = (req: Request, res: Response) => { // /users/:id PUT
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      user.username = req.body.username ? req.body.username : user.username; // ha nem adunk meg új nevet, akkor felülírja undefined-dal
      user.email = req.body.email ? req.body.email : user.email; // feltétel '?' ha_igaz : ha_hamis <-- inline if
      return res.status(203).json(user);
    }
  }
  return res.status(200).json({});
};

const userDeleteHandler = (req: Request, res: Response) => { // /users/:id DELETE
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      users.splice(i, 1);
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

app.get('/users', todoIndexHandler); // /todos GET
app.post('/users', userCreateHandler); // /users POST               // Create
app.get('/users/:id', userShowHandler); // /users/:id GET           // Read
app.put('/users/:id', userUpdateHandler); // /users/:id PUT         // Update
app.delete('/users/:id', userDeleteHandler); // /users/:id DELETE   // Delete

app.listen(port, () => { console.log(`I'm listening on ${port}`) });
