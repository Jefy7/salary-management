import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';

@Controller('employees')
export class EmployeesController {
    constructor(protected readonly service: EmployeesService) { }

    @Post()
    async create(@Body() body: CreateEmployeeDto) {
        return await this.service.create(body);
    }

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(Number(id));
    }
}
