import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Tag } from './tag.model';

@Table({
  tableName: 'nest_js_user'
})
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  
  @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
  createdAt: number;

  @Column({ type: DataType.STRING(128), unique: true, allowNull: false })
  userName: string;

  // @HasMany(() => Tag, { foreignKey: 'user', sourceKey: 'userName' })
  // tags: Tag[];
}