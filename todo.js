"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express'); // JavaScript import
var express_1 = __importDefault(require("express")); // TypeScript import
var app = express_1.default();
var port = process.env.API_PORT || 3030;
var todos = [];
var todoIndex = 0;
var users = [];
var userIndex = 0;
var rootHandler = function (req, res) {
    console.log(req.params, req.query);
    res.json({ status: 'ok', id: req.params.id });
};
// todo
var todoIndexHandler = function (req, res) {
    res.json(todos);
};
var todoCreateHandler = function (req, res) {
    console.log(req.body);
    var todo = {
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
var todoShowHandler = function (req, res) {
    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
        var todo = todos_1[_i];
        if (todo.id === parseInt(req.params.id)) {
            return res.json(todo); // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        }
    }
    res.json({});
};
var todoUpdateHandler = function (req, res) {
    for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {
        var todo = todos_2[_i];
        if (todo.id === parseInt(req.params.id)) {
            todo.name = req.body.name; // ha nem adunk meg új nevet, akkor felülírja undefined-dal
            todo.description = req.body.description;
            todo.status = req.body.status;
            return res.status(203).json(todo);
        }
    }
    return res.status(200).json({});
};
var todoDeleteHandler = function (req, res) {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        if (todo.id === parseInt(req.params.id)) {
            todos.splice(i, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
// user
var userIndexHandler = function (req, res) {
    res.json(users);
};
var userCreateHandler = function (req, res) {
    console.log(req.body);
    var user = {
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
var userShowHandler = function (req, res) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        if (user.id === parseInt(req.params.id)) {
            delete user.password; // lodash is használható
            console.log(users);
            return res.json(user); //vagy res.send(user) send // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        }
    }
    res.json({});
};
var userUpdateHandler = function (req, res) {
    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        if (user.id === parseInt(req.params.id)) {
            user.username = req.body.username ? req.body.username : user.username; // ha nem adunk meg új nevet, akkor felülírja undefined-dal
            user.email = req.body.email ? req.body.email : user.email; // feltétel '?' ha_igaz : ha_hamis <-- inline if
            return res.status(203).json(user);
        }
    }
    return res.status(200).json({});
};
var userDeleteHandler = function (req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(req.params.id)) {
            users.splice(i, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
app.use(express_1.default.json());
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
app.listen(port, function () { console.log("I'm listening on " + port); });
