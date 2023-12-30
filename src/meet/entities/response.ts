import { Column, DataType, Default, ForeignKey, Model, NotNull, PrimaryKey, Table } from 'sequelize-typescript';

import { Question } from '.';

@Table
export class Response extends Model {
  @PrimaryKey
  @Default(DataType.UUID)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Question)
  @NotNull
  @Column({
    field: 'question_id',
    type: DataType.STRING,
    allowNull: false,
  })
  questionId: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  answer: string;

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
}
