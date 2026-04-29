import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [EmployeesModule],
  providers: [SalaryService],
  controllers: [SalaryController],
})
export class SalaryModule { }
