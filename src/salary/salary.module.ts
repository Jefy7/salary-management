import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  providers: [SalaryService, EmployeesService],
  controllers: [SalaryController]
})
export class SalaryModule { }
