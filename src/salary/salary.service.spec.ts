import { Test, TestingModule } from '@nestjs/testing';
import { SalaryService } from './salary.service';
import { EmployeesService } from '../employees/employees.service';

describe('SalaryService', () => {
  let service: SalaryService;
  let employeesService: jest.Mocked<EmployeesService>;

  const mockEmployeesService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalaryService,
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    service = module.get<SalaryService>(SalaryService);
    employeesService = module.get(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ BASIC
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ✅ INDIA (10%)
  it('should calculate salary for India (10% deduction)', async () => {
    employeesService.findOne.mockResolvedValue({
      id: 1,
      fullName: 'Raj',
      jobTitle: 'Engineer',
      country: 'India',
      salary: 50000,
    } as any);

    const result = await service.calculate(1);

    expect(result).toEqual({
      gross: 50000,
      deduction: 5000,
      net: 45000,
    });
  });

  // ✅ UNITED STATES (12%)
  it('should calculate salary for United States (12% deduction)', async () => {
    employeesService.findOne.mockResolvedValue({
      id: 2,
      fullName: 'John',
      jobTitle: 'Engineer',
      country: 'United States',
      salary: 100000,
    } as any);

    const result = await service.calculate(2);

    expect(result).toEqual({
      gross: 100000,
      deduction: 12000,
      net: 88000,
    });
  });

  // ✅ OTHER COUNTRIES (0%)
  it('should return full salary for other countries', async () => {
    employeesService.findOne.mockResolvedValue({
      id: 3,
      fullName: 'Ken',
      jobTitle: 'Engineer',
      country: 'Japan',
      salary: 50000,
    } as any);

    const result = await service.calculate(3);

    expect(result).toEqual({
      gross: 50000,
      deduction: 0,
      net: 50000,
    });
  });

  // ✅ EDGE CASE: ZERO SALARY
  it('should handle zero salary', async () => {
    employeesService.findOne.mockResolvedValue({
      id: 4,
      fullName: 'Zero',
      jobTitle: 'Intern',
      country: 'India',
      salary: 0,
    } as any);

    const result = await service.calculate(4);

    expect(result).toEqual({
      gross: 0,
      deduction: 0,
      net: 0,
    });
  });

  // ✅ ERROR PROPAGATION
  it('should propagate error if employee not found', async () => {
    employeesService.findOne.mockRejectedValue(new Error('Not Found'));

    await expect(service.calculate(999)).rejects.toThrow('Not Found');
  });
});