/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/controllers/todo.ts":
/*!*************************************!*\
  !*** ./src/app/controllers/todo.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar todos = [];\nvar todoIndex = 0;\nexports.index = function (req, res) {\n    res.json(todos);\n};\nexports.show = function (req, res) {\n    for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {\n        var todo = todos_1[_i];\n        if (todo.id === parseInt(req.params.id)) {\n            return res.json(todo); // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client\n        }\n    }\n    res.json({});\n};\nexports.create = function (req, res) {\n    console.log(req.body);\n    var todo = {\n        id: todoIndex,\n        name: req.body.name,\n        description: req.body.description,\n        status: req.body.status,\n        authorID: -1\n    };\n    todos.push(todo);\n    todoIndex++;\n    res.status(201).json(todo);\n};\nexports.update = function (req, res) {\n    for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {\n        var todo = todos_2[_i];\n        if (todo.id === parseInt(req.params.id)) {\n            todo.name = req.body.name; // ha nem adunk meg új nevet, akkor felülírja undefined-dal\n            todo.description = req.body.description;\n            todo.status = req.body.status;\n            return res.status(203).json(todo);\n        }\n    }\n    return res.status(200).json({});\n};\nexports.destroy = function (req, res) {\n    for (var i = 0; i < todos.length; i++) {\n        var todo = todos[i];\n        if (todo.id === parseInt(req.params.id)) {\n            todos.splice(i, 1);\n            return res.sendStatus(204);\n        }\n    }\n    res.sendStatus(200);\n};\n\n\n//# sourceURL=webpack:///./src/app/controllers/todo.ts?");

/***/ }),

/***/ "./src/app/controllers/user.ts":
/*!*************************************!*\
  !*** ./src/app/controllers/user.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar users = [];\nvar userIndex = 0;\nexports.index = function (req, res) {\n    res.json(users);\n};\nexports.show = function (req, res) {\n    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {\n        var user = users_1[_i];\n        if (user.id === parseInt(req.params.id)) {\n            delete user.password; // lodash is használható\n            console.log(users);\n            return res.json(user); //vagy res.send(user) send // ha return-be van, akkor tuti megszakad a futása és nem lesz hiba: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client\n        }\n    }\n    res.json({});\n};\nexports.create = function (req, res) {\n    console.log(req.body);\n    var user = {\n        id: userIndex,\n        username: req.body.username,\n        email: req.body.email,\n        role: 'user',\n        password: req.body.password\n    };\n    users.push(user);\n    userIndex++;\n    res.status(201).json(user);\n};\nexports.update = function (req, res) {\n    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {\n        var user = users_2[_i];\n        if (user.id === parseInt(req.params.id)) {\n            user.username = req.body.username ? req.body.username : user.username; // ha nem adunk meg új nevet, akkor felülírja undefined-dal\n            user.email = req.body.email ? req.body.email : user.email; // feltétel '?' ha_igaz : ha_hamis <-- inline if\n            return res.status(203).json(user);\n        }\n    }\n    return res.status(200).json({});\n};\nexports.destroy = function (req, res) {\n    for (var i = 0; i < users.length; i++) {\n        if (users[i].id === parseInt(req.params.id)) {\n            users.splice(i, 1);\n            return res.sendStatus(204);\n        }\n    }\n    res.sendStatus(200);\n};\n\n\n//# sourceURL=webpack:///./src/app/controllers/user.ts?");

/***/ }),

/***/ "./src/app/routers/index.ts":
/*!**********************************!*\
  !*** ./src/app/routers/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar todo_1 = __webpack_require__(/*! ./todo */ \"./src/app/routers/todo.ts\");\nvar user_1 = __webpack_require__(/*! ./user */ \"./src/app/routers/user.ts\");\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nexports.router = express_1.Router({ mergeParams: true });\nexports.router.use(todo_1.router);\nexports.router.use(user_1.router);\n\n\n//# sourceURL=webpack:///./src/app/routers/index.ts?");

/***/ }),

/***/ "./src/app/routers/todo.ts":
/*!*********************************!*\
  !*** ./src/app/routers/todo.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar todoController = __webpack_require__(/*! ../controllers/todo */ \"./src/app/controllers/todo.ts\");\nexports.router = express_1.Router({ mergeParams: true });\nexports.router.get('/todo', todoController.index); // /todo GET\nexports.router.post('/todo', todoController.create); // /todo POST\nexports.router.get('/todo/:id', todoController.show); // /todo/:id GET\nexports.router.put('/todo/:id', todoController.update); // /todo/:id PUT\nexports.router[\"delete\"]('/todo/:id', todoController.destroy); // /todo/:id DELETE\n\n\n//# sourceURL=webpack:///./src/app/routers/todo.ts?");

/***/ }),

/***/ "./src/app/routers/user.ts":
/*!*********************************!*\
  !*** ./src/app/routers/user.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar userController = __webpack_require__(/*! ../controllers/user */ \"./src/app/controllers/user.ts\");\nexports.router = express_1.Router({ mergeParams: true });\nexports.router.get('/user', userController.index); // /user GET\nexports.router.post('/user', userController.create); // /user POST               // Create\nexports.router.get('/user/:id', userController.show); // /user/:id GET           // Read\nexports.router.put('/user/:id', userController.update); // /user/:id PUT         // Update\nexports.router[\"delete\"]('/user/:id', userController.destroy); // /user/:id DELETE  // Delete\n\n\n//# sourceURL=webpack:///./src/app/routers/user.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\n// const express = require('express'); // JavaScript import\nvar express = __webpack_require__(/*! express */ \"express\");\nvar routers_1 = __webpack_require__(/*! ./app/routers */ \"./src/app/routers/index.ts\"); // === './app/routers/index'\nvar app = express();\nvar port = process.env.API_PORT || 3030;\nvar rootHandler = function (req, res) {\n    console.log(req.params, req.query);\n    res.json({ status: 'yuppi ok', id: req.params.id });\n};\napp.use(express.json());\napp.get('/', rootHandler);\napp.use(routers_1.router);\napp.listen(port, function () { console.log(\"I'm listening on \" + port); });\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ })

/******/ });