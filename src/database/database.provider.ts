import { Sequelize } from 'sequelize-typescript';

import { Meet, Question, Response } from 'meet/entities';
import { User } from 'user/entities/user';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        timezone: '+00:00',
      });
      sequelize.addModels([User, Meet, Question, Response]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
