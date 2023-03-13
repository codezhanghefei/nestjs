import { Logger } from "@/share";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout, SchedulerRegistry } from "@nestjs/schedule";
import CronJob from 'cron';

@Injectable()
export class DemoScheduleService {
  constructor(
    private readonly logger: Logger,
    private schedulerRegistry: SchedulerRegistry,
  ){}

  // 计时任务
  @Cron('0 30 10 * * *') // 每天10点30分时，执行任务
  demo1() {
    this.logger.log('demo1 schedule')
  };

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_10AM, { name: 'demo2'}) // 星期一至星期五每天10点时，执行任务
  demo2() {
    this.logger.log('demo2 schedule')
  };

  // 声明时间间隔，单位毫秒，底层是使用SetInterval实现的
  @Interval(10 * 1000)
  demo3() {
    this.logger.log('demo3 schedule')
  };

  @Interval('demo4', 10 * 1000) // 声明定时任务名称，可以通过名称获取定时任务实例，修改执行时间、状态等
  demo4() {
    this.logger.log('demo4 schedule')
  };

  // 延时任务 底层是使用 SetTimeout 实现的
  @Timeout('demo5', 1000 * 50) // 50 秒执行
  demo5() {
    this.logger.log('demo5 schedule')
  };

  getScheduleTask() {
    const job = this.schedulerRegistry.getCronJob('demo4');
    // 停止定时任务
    job.stop();

    // 重新设置执行时间
    job.setTime('0 0 10 * * *');

    // 重启
    job.start();
    job.lastDate(); // 返回上次执行的时间
    job.nextDates(); // 返回数组，即将执行的时间
  }

  // 动态添加定时任务
  addCronJob(cron: string, name: string) {
    const job = new CronJob(cron, () => {
      this.logger.log('add cron job');
    })
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.schedulerRegistry.deleteCronJob(name);
  }

  // 动态添加时间间隔任务
  addIntervalJob(seconds: number) {
    const callback = () => {
      this.logger.log('add interval job');
      // interval 
      const interval = setInterval(callback, seconds);

      this.schedulerRegistry.addInterval('interval', interval);

      // 删除
      this.schedulerRegistry.deleteInterval('interval');
    }
  }

  // 动态添加延时任务
  addTimeoutJob(seconds: number) {
    const callback = () => {
      this.logger.log('add interval job');
      // timeout 
      const timeout = setTimeout(callback, seconds);

      this.schedulerRegistry.addTimeout('timeout', timeout);

      // 删除
      this.schedulerRegistry.deleteTimeout('timeout');
    }
  }
}