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
        const emp = this.repo.create(data);
        return this.repo.save(emp);
    }

    async findAll() {
    }

    async findOne(id: number) {
    }

    async update(id: number, data: Partial<Employee>) {
    }

    async remove(id: number) {
    }
}