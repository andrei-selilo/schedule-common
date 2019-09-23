import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Aggregate } from 'src/core/types/aggregate';
import createSchedule, { Schedule } from '../../../../../domain/models/schedule';
import { DateRange } from '../../../../../core/types/date-range';
import { Price } from '../../../../../core/types/price';
import { Command } from '../../../../../core/types/command';

@Entity('schedules')
export class ScheduleEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  customerId: string;

  @Column()
  providerId: string;

  @Column()
  datetime: Date;

  @Column()
  reservedDates: (Date | DateRange)[];

  @Column()
  price: Price;

  @Column()
  commands: Command[];

  @Column()
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column()
  updatedAt: Date;

  @Column()
  updatedBy: Date;

  constructor(data: any = {}) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.providerId = data.providerId;
    this.datetime = data.datetime;
    this.reservedDates = data.reservedDates;
    this.price = data.price;
    this.commands = data.commands;
    this.createdAt = data.createdAt;
    this.createdBy = data.createdBy;
    this.updatedAt = data.updatedAt;
    this.updatedBy = data.updatedBy;
  }

  toSchedule(): Schedule {
    return createSchedule({
      ...this,
      id: this.id.toString(),
    });
  }

  static createFromScheduleAggregate(aggregate: Aggregate<Schedule>): ScheduleEntity {
    return new ScheduleEntity({ ...aggregate.model, commands: aggregate.commands });
  }
}
