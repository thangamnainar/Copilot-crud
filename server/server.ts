import { Express, Request, Response } from 'express';
import * as mysql from 'mysql';

const express = require('express');
const cors = require('cors');

class Database {
    private _connection: mysql.Connection;
    constructor() {
        this._connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'thangam',
            password: 'Thasan24',
            database: 'test'
        });
        this._connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        });
    }
    get connection(): mysql.Connection {
        return this._connection;
    }
}

class App {
    public express: Express;
    private _db: Database;
    constructor() {
        this.express = express();
        this.express.use(express.json());
        this.express.use(cors());
        this._db = new Database();
        this.express.get('/users', (req: Request, res: Response) => this.getUsers(req, res));
        this.express.get('/getById/:id', (req: Request, res: Response) => this.getById(req, res));
        this.express.post('/addUsers', (req: Request, res: Response) => this.addUser(req, res));
        this.express.put('/updateUser', (req: Request, res: Response) => this.updateUser(req, res));
        this.express.put('/deleteUser', (req: Request, res: Response) => this.deleteUser(req, res));
        this.listen();
    }
    private getUsers(req: Request, res: Response) {
        this._db.connection.query('SELECT id,name,age,gender,skills FROM student_details where isActive = 0', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    res.json(result);
                } else {
                    res.json({ message: "No User Found" });
                }
            }
        });
    }
    private getById(req: Request, res: Response) {
        let id = req.params.id;
        this._db.connection.query('SELECT * FROM student_details WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    res.json(result);
                    console.log(result);
                } else {
                    res.json({ message: "No User Found" });
                    
                }
            }
        });
    }
    private addUser(req: Request, res: Response) {
        let user = req.body;
        this._db.connection.query('INSERT INTO student_details SET ?', user, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ message: "User Added Successfully" });
            }
        });
    }
    private updateUser(req: Request, res: Response) {
        let {id,name,age,gender} = req.body;
        this._db.connection.query('UPDATE student_details SET name = ?, age = ?, gender = ? WHERE id = ?', [name,age,gender, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ message: "User Updated Successfully" });
            }
        });
    }
    private deleteUser(req: Request, res: Response) {
        let id = req.body.id;
        this._db.connection.query('UPDATE student_details SET isActive = 1 WHERE id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ message: "User Deleted Successfully" });

            }
        });
    }
    public listen(): void {
        this.express.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    }


}
let app = new App();
