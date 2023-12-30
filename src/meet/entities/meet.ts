import { Column, DataType, Default, ForeignKey, Model, NotNull, PrimaryKey, Table } from 'sequelize-typescript';

import { User } from 'user/entities/user';

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
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @NotNull
  @Column({
    field: 'user_id',
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

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
    allowNull: false,
  })
  endedAt: Date;
}
