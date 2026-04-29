import { Test, TestingModule } from '@nestjs/testing';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { EmployeesService } from 'src/employees/employees.service';

describe('SalaryController', () => {
  let controller: SalaryController;
  let salaryService: jest.Mocked<SalaryService>;
  let employeesService: jest.Mocked<EmployeesService>;

  const mockSalaryService = {
    calculate: jest.fn(),
  };

  const mockEmployeesService = {
    byCountry: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryController],
      providers: [
        {
          provide: SalaryService,
          useValue: mockSalaryService,
        },
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    controller = module.get<SalaryController>(SalaryController);
    salaryService = module.get(SalaryService);
    employeesService = module.get(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ BASIC
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ✅ CALCULATE SALARY
  describe('calculate', () => {
    it('should calculate salary using numeric id', async () => {
      const mockResponse = {
        gross: 50000,
        deduction: 5000,
        net: 45000,
      };

      salaryService.calculate.mockResolvedValue(mockResponse);

      const result = await controller.calculate('1');

      expect(salaryService.calculate).toHaveBeenCalledWith(1); // important
      expect(result).toEqual(mockResponse);
    });

    it('should handle invalid id conversion (NaN)', async () => {
      salaryService.calculate.mockResolvedValue(null as any);

      const result = await controller.calculate('abc');

      expect(salaryService.calculate).toHaveBeenCalledWith(NaN);
      expect(result).toBeNull();
    });
  });

  // ✅ METRICS BY COUNTRY
  describe('getByCountry', () => {
    it('should return salary metrics for a country', async () => {
      const mockMetrics = {
        min: 10000,
        max: 30000,
        avg: 20000,
      };

      employeesService.byCountry.mockResolvedValue(mockMetrics);

      const result = await controller.getByCountry('India');

      expect(employeesService.byCountry).toHaveBeenCalledWith('India');
      expect(result).toEqual(mockMetrics);
    });

    it('should handle empty metrics result', async () => {
      employeesService.byCountry.mockResolvedValue({
        min: 0,
        max: 0,
        avg: 0,
      });

      const result = await controller.getByCountry('Unknown');

      expect(result).toEqual({
        min: 0,
        max: 0,
        avg: 0,
      });
    });
  });
});