import { Controller, Get, Param } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
    constructor(protected readonly service: SalaryService) { }

    @Get(':id')
    calculate(@Param('id') id: string) {
        return this.service.calculate(Number(id));
    }

}
