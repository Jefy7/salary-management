import { Controller, Get, Param } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { EmployeesService } from 'src/employees/employees.service';

@Controller('salary')
export class SalaryController {
    constructor(
        protected readonly service: SalaryService,
        protected readonly empService: EmployeesService,
    ) { }

    @Get(':id')
    calculate(@Param('id') id: string) {
        return this.service.calculate(Number(id));
    }

    @Get('metrics/country/:country')
    getByCountry(@Param('country') country: string) {
        return this.empService.byCountry(country);
    }

}
