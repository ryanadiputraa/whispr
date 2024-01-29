import { Sequelize } from 'sequelize-typescript';

import { MeetSentiment } from 'meet-sentiment/entities/meet-sentiment';
import { Meet, Question, Response } from 'meet/entities';
import { User } from 'user/entities/user';

const conf =
  process.env.NODE_ENV === 'prod'
    ? {
        dialectOptions: {
          ssl: {
            rejectUnauthorized: true,
          },
        },
        define: {
          timestamps: false,
        },
      }
    : {};

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
        ...conf,
      });
      sequelize.addModels([User, Meet, Question, Response, MeetSentiment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
