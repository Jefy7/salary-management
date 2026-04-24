import { Body, Controller, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(protected readonly service: EmployeesService) { }

    @Post()
    create(@Body() body) {
        return this.service.create(body);
    }
}
