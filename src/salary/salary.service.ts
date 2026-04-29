import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class SalaryService {
    constructor(protected readonly employeeService: EmployeesService) { }

    async calculate(id: number) {
        const emp = await this.employeeService.findOne(id);

        let rate = 0;
        if (emp.country === 'India') rate = 0.1;
        else if (emp.country === 'United States') rate = 0.12;

        const deduction = emp.salary * rate;

        return {
            gross: emp.salary,
            deduction,
            net: emp.salary - deduction,
        };
    }

}
