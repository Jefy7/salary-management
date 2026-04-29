import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';

@Controller('employees')
export class EmployeesController {
    constructor(protected readonly service: EmployeesService) { }

    @Post()
    create(@Body() body: CreateEmployeeDto) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }
}
