import { User } from "../models/user";
import { Request, Response } from "express";

const users: Array<User> = [];
let userIndex: number = 0;

export const index = (req: Request, res: Response) => { // /todos GET
  res.json(users);
};

export const show = (req: Request, res: Response) => { // /users/:id GET
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      delete user.password; // lodash is használható
      console.log(users);
      return res.json(user); //vagy res.send(user) send // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
  }
  res.json({});
};

export const create = (req: Request, res: Response) => { // /users POST
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

export const update = (req: Request, res: Response) => { // /users/:id PUT
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      user.username = req.body.username ? req.body.username : user.username; // ha nem adunk meg új nevet, akkor felülírja undefined-dal
      user.email = req.body.email ? req.body.email : user.email; // feltétel '?' ha_igaz : ha_hamis <-- inline if
      return res.status(203).json(user);
    }
  }
  return res.status(200).json({});
};

export const destroy = (req: Request, res: Response) => { // /users/:id DELETE
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      users.splice(i, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};