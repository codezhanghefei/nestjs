import { ConfigService } from '@nestjs/config';
import { Global, Module } from "@nestjs/common";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";

import { User, Tag } from './models';

function buildDBConfig({ host, port, username, password, database }): SequelizeModuleOptions {
  return {
    dialect: 'mysql',
    host,
    port,
    username,
    password,
    database,
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    pool: {
      min: 1
    },
    autoLoadModels: true,
  };
}


@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): SequelizeModuleOptions => {
        const options = buildDBConfig({
          host: config.get('db.host'),
          port: config.get('db.port'),
          username: config.get('db.username'),
          password: config.get('db.password'),
          database: config.get('db.database'),
        });
        return {
          ...options,
          synchronize: config.get('app.env') === 'dev',
          logging: config.get('db.logging'),
        };
      },
    }),
    // 定义多个
    SequelizeModule.forRootAsync({
      name: 'main2',
      inject: [ConfigService],
      useFactory: (config: ConfigService): SequelizeModuleOptions => {
        const options = buildDBConfig({
          host: config.get('db.host'),
          port: config.get('db.port'),
          username: config.get('db.username'),
          password: config.get('db.password'),
          database: config.get('db.database'),
        });
        return {
          ...options,
          synchronize: config.get('app.env') === 'dev',
          logging: config.get('db.logging'),
          models: [Tag],
        };
      },
    }),
    SequelizeModule.forFeature([
      User
    ]),
    SequelizeModule.forFeature([
      Tag
    ], 'main2')
  ],
  exports: [ SequelizeModule ],
})
export class DatabaseModule {}
