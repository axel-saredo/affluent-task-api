import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { json } from 'body-parser';

import { UserRepository } from './repositories/user.repository';
import { DateRepository } from './repositories/date.repository';

import { SERVER_CONFIG, DATABASE_CONFIG } from './config';
import apiRouter from './routes';

const app = express();
const db = new Sequelize(DATABASE_CONFIG);

app.use(json());
app.use('/api', apiRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(SERVER_CONFIG.port, () => {
    console.log(`Server listening on port ${SERVER_CONFIG.port}...`);

    db.addModels([UserRepository, DateRepository]);
    db.authenticate().then(async() => {
        console.log('Database connected...');
        try {
            await db.sync({force: true});
        } catch (error) {
            console.error(error);
        }
    });
});