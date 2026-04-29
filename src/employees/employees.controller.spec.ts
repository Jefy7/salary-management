import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: jest.Mocked<EmployeesService>;

  const mockEmployee = {
    id: 1,
    fullName: 'John Doe',
    jobTitle: 'Engineer',
    country: 'India',
    salary: 50000,
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ BASIC
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ✅ CREATE
  describe('create', () => {
    it('should create an employee', async () => {
      service.create.mockResolvedValue(mockEmployee);

      const result = await controller.create(mockEmployee);

      expect(service.create).toHaveBeenCalledWith(mockEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  // ✅ FIND ALL
  describe('findAll', () => {
    it('should return all employees', async () => {
      service.findAll.mockResolvedValue([mockEmployee]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });

    it('should return empty array if no employees', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  // ✅ FIND ONE
  describe('findOne', () => {
    it('should return employee by id', async () => {
      service.findOne.mockResolvedValue(mockEmployee);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1); // number conversion
      expect(result).toEqual(mockEmployee);
    });

    it('should propagate error if employee not found', async () => {
      service.findOne.mockRejectedValue(new Error('Not Found'));

      await expect(controller.findOne('1')).rejects.toThrow('Not Found');
    });
  });

  // ✅ UPDATE
  describe('update', () => {
    it('should update employee', async () => {
      const updated = { ...mockEmployee, salary: 60000 };

      service.update.mockResolvedValue(updated);

      const result = await controller.update('1', {
        salary: 60000
      } as UpdateEmployeeDto);

      expect(service.update).toHaveBeenCalledWith(1, { salary: 60000 });
      expect(result).toEqual(updated);
    });
  });

  // ✅ DELETE
  describe('remove', () => {
    it('should delete employee and return formatted response', async () => {
      service.remove.mockResolvedValue(mockEmployee);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);

      expect(result).toEqual({
        message: 'Resource deleted successfully',
        data: 1,
      });
    });
  });
});