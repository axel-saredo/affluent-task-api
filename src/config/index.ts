import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import * as models from '../users/repositories/user.repository';

dotenv.config();

export const DATABASE_CONFIG: SequelizeOptions = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  dialect: (process.env.DB_DIALECT) as Dialect,
  models: Object.values(models),
};

export const SERVER_CONFIG = {
    port: parseInt(process.env.PORT!) || 8080,
};