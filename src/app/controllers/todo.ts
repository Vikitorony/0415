import { ToDo } from '../models/todo';
import { Request, Response } from 'express';

const todos: Array<ToDo> = [];
let todoIndex: number = 0;

export const index = (req: Request, res: Response) => { // /todos GET
  res.json(todos);
};

export const show = (req: Request, res: Response) => { // /todos/:id GET
  for (const todo of todos) {
    if (todo.id === parseInt(req.params.id)) {
      return res.json(todo); // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
  }
  res.json({});
};

export const create = (req: Request, res: Response) => { // /todos POST
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

export const update = (req: Request, res: Response) => { // /todos/:id PUT
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

export const destroy = (req: Request, res: Response) => { // /todos/:id DELETE
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === parseInt(req.params.id)) {
      todos.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};