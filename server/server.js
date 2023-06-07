"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var express = require('express');
var cors = require('cors');
var Database = /** @class */ (function () {
    function Database() {
        this._connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'thangam',
            password: 'Thasan24',
            database: 'test'
        });
        this._connection.connect(function (err) {
            if (err)
                throw err;
            console.log('Connected!');
        });
    }
    Object.defineProperty(Database.prototype, "connection", {
        get: function () {
            return this._connection;
        },
        enumerable: false,
        configurable: true
    });
    return Database;
}());
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.express = express();
        this.express.use(express.json());
        this.express.use(cors());
        this._db = new Database();
        this.express.get('/users', function (req, res) { return _this.getUsers(req, res); });
        this.express.get('/getById/:id', function (req, res) { return _this.getById(req, res); });
        this.express.post('/addUsers', function (req, res) { return _this.addUser(req, res); });
        this.express.put('/updateUser', function (req, res) { return _this.updateUser(req, res); });
        this.express.put('/deleteUser', function (req, res) { return _this.deleteUser(req, res); });
        this.listen();
    }
    App.prototype.getUsers = function (req, res) {
        this._db.connection.query('SELECT id,name,age,gender,skills FROM student_details where isActive = 0', function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.json({ message: "No User Found" });
                }
            }
        });
    };
    App.prototype.getById = function (req, res) {
        var id = req.params.id;
        this._db.connection.query('SELECT * FROM student_details WHERE id = ?', id, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    res.json(result);
                    console.log(result);
                }
                else {
                    res.json({ message: "No User Found" });
                }
            }
        });
    };
    App.prototype.addUser = function (req, res) {
        var user = req.body;
        this._db.connection.query('INSERT INTO student_details SET ?', user, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "User Added Successfully" });
            }
        });
    };
    App.prototype.updateUser = function (req, res) {
        var _a = req.body, id = _a.id, name = _a.name, age = _a.age, gender = _a.gender;
        this._db.connection.query('UPDATE student_details SET name = ?, age = ?, gender = ? WHERE id = ?', [name, age, gender, id], function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "User Updated Successfully" });
            }
        });
    };
    App.prototype.deleteUser = function (req, res) {
        var id = req.body.id;
        this._db.connection.query('UPDATE student_details SET isActive = 1 WHERE id = ?', id, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ message: "User Deleted Successfully" });
            }
        });
    };
    App.prototype.listen = function () {
        this.express.listen(3000, function () {
            console.log('Server running on port 3000');
        });
    };
    return App;
}());
var app = new App();
