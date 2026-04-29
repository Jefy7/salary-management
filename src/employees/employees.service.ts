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

    async findAll(): Promise<Employee[]> {
        return await this.repo.find();
    }

    async findOne(id: number): Promise<Employee> {
        const emp = await this.repo.findOneBy({ id });
        if (!emp) throw new NotFoundException();
        return emp
    }

    async update(id: number, data: Partial<Employee>) {
        await await this.repo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number) {
        const emp = await this.findOne(id);
        return this.repo.remove(emp);
    }
}