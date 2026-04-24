import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private repo: Repository<Employee>,
    ) { }

    async create(data: Partial<Employee>) {
        const emp = await this.repo.create(data);
        return await this.repo.save(emp);
    }

    async findAll() {
        return this.repo.find();
    }

    async findOne(id: number) {
    }

    async update(id: number, data: Partial<Employee>) {
    }

    async remove(id: number) {
    }
}