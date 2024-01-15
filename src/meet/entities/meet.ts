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

@Table({ tableName: 'meets', underscored: true, timestamps: false })
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
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @NotNull
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    field: 'ended_at',
    type: DataType.DATE,
    allowNull: true,
  })
  endedAt: Date;

  @HasMany(() => Question)
  questions: Question[];
}
