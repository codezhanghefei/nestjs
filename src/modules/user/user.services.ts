import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@/share';
import { User, Tag } from '@/share/modules/database/models';
import { InjectModel } from '@nestjs/sequelize';
import moment from 'moment';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Tag, 'main2')
    private tagModel: typeof Tag,
    @InjectModel(User)
    private userModel: typeof User,
    
    private config: ConfigService,
    private logger: Logger,
  ) {}
  async getUsers():Promise<any> {
    const userNamePrefix = 'userName'
    // 创建
    await this.userModel.create({
      userName: userNamePrefix + Math.random(),
      createdAt: moment().valueOf(),
    })

    const query = {
      createdAt: {
        [Op.lte]: moment().valueOf(),
      },
      userName: {
        [Op.like]: `%${userNamePrefix}%`
      },
      id: {
        [Op.in]: [1,2,3,4,5,6,7,8,10]
      },
    };
    // query[Op.or] = [
    //   { name: { [Op.like]: `%${userNamePrefix}%`} },
    //   { createdAt: { [Op.lte]: moment().valueOf()} }
    // ]
    // query[Op.and] = [
    //   { name: { [Op.like]: `%${userNamePrefix}%`} },
    //   { createdAt: { [Op.lte]: moment().valueOf()} }
    // ]
    return await this.userModel.findAndCountAll({
      where: query,
      limit: 10,
      offset: 0,
    })
  }
}
