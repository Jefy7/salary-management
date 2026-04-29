import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class SalaryService {
    constructor(protected readonly employeeService: EmployeesService) { }

    async calculate(id: number) {
        const emp = await this.employeeService.findOne(id);

        let rate = this.getRate(emp.country)
        const deduction = emp.salary * rate;

        return {
            gross: emp.salary,
            deduction,
            net: emp.salary - deduction,
        };
    }


    private getRate(country: string): number {
        let rate = 0;
        if (country === 'India') rate = 0.1;
        else if (country === 'United States') rate = 0.12;
        return rate;
    }

}
