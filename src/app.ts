import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import { SERVER_CONFIG, DATABASE_CONFIG } from './config';
import userRoutes from './users/router';
import { Sequelize } from 'sequelize-typescript';

const app = express();
const db = new Sequelize(DATABASE_CONFIG);

app.use(json());
app.use('/api', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(SERVER_CONFIG.port, () => {
    console.log(`Server listening on port ${SERVER_CONFIG.port}...`);

    db.authenticate().then(async() => {
        console.log('Database connected...');
        try {
            await db.sync({force: true});
        } catch (error) {
            console.error(error);
        }
    });
});