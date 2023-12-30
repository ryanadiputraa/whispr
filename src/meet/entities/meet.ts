import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from 'user/entities/user';
import { Question } from './question';

export type MeetSessions = {
  [meetId: string]: {
    [client: string]: boolean; // true = moderator
  };
};

@Table
export class Meet extends Model {
  @PrimaryKey
  @Default(DataType.UUID)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @NotNull
  @Column({
    field: 'user_id',
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @NotNull
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @NotNull
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @Column({
    field: 'ended_at',
    type: DataType.DATE,
    allowNull: true,
  })
  endedAt: Date;

  @HasMany(() => Question)
  questions: Question[];
}
