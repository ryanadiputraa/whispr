import { Meet } from 'meet/entities';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'meet_sentiments', underscored: true, timestamps: false })
export class MeetSentiment extends Model {
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
    unique: true,
  })
  topic: string;

  @NotNull
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @NotNull
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  percentage: number;
}
