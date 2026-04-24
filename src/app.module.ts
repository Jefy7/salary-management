import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/employee.entity';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.NODE_ENV === 'test' ? ':memory:' : 'db.sqlite',
      dropSchema: process.env.NODE_ENV === 'test',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeesModule,
  ],
})
export class AppModule { }