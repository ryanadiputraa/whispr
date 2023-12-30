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

import { Meet, Response } from '.';

@Table
export class Question extends Model {
  @PrimaryKey
  @Default(DataType.UUID)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Meet)
  @NotNull
  @Column({
    field: 'meet_id',
    type: DataType.UUID,
    allowNull: false,
  })
  meetId: string;

  @BelongsTo(() => Meet)
  meet: Meet;

  @NotNull
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question: string;

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

  @HasMany(() => Response)
  resopnses: Response[];
}
