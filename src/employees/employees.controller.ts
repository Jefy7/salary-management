import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';

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

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
        return await this.service.update(Number(id), body);
    }
}
