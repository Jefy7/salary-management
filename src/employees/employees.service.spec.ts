import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { NotFoundException } from '@nestjs/common';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let repo: jest.Mocked<Repository<Employee>>;

  const mockEmployee: Employee = {
    id: 1,
    fullName: 'John Doe',
    jobTitle: 'Engineer',
    country: 'India',
    salary: 50000,
  };

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    repo = module.get(getRepositoryToken(Employee));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ BASIC
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ✅ CREATE
  describe('create', () => {
    it('should create and save employee', async () => {
      repo.create.mockReturnValue(mockEmployee);
      repo.save.mockResolvedValue(mockEmployee);

      const result = await service.create(mockEmployee);

      expect(repo.create).toHaveBeenCalledWith(mockEmployee);
      expect(repo.save).toHaveBeenCalledWith(mockEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  // ✅ FIND ALL
  describe('findAll', () => {
    it('should return all employees', async () => {
      repo.find.mockResolvedValue([mockEmployee]);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual([mockEmployee]);
    });

    it('should return empty array', async () => {
      repo.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  // ✅ FIND ONE
  describe('findOne', () => {
    it('should return employee if found', async () => {
      repo.findOneBy.mockResolvedValue(mockEmployee);

      const result = await service.findOne(1);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockEmployee);
    });

    it('should throw NotFoundException if not found', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ✅ UPDATE
  describe('update', () => {
    it('should update and return updated employee', async () => {
      repo.update.mockResolvedValue(undefined as any);
      repo.findOneBy.mockResolvedValue(mockEmployee);

      const result = await service.update(1, { salary: 60000 });

      expect(repo.update).toHaveBeenCalledWith(1, { salary: 60000 });
      expect(result).toEqual(mockEmployee);
    });
  });

  // ✅ REMOVE
  describe('remove', () => {
    it('should remove employee', async () => {
      repo.findOneBy.mockResolvedValue(mockEmployee);
      repo.remove.mockResolvedValue(mockEmployee);

      const result = await service.remove(1);

      expect(repo.remove).toHaveBeenCalledWith(mockEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  // ✅ METRICS (byCountry)
  describe('byCountry', () => {
    it('should return salary metrics with numeric values', async () => {
      const mockQB: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({
          min: '10000',
          max: '30000',
          avg: '20000',
        }),
      };

      repo.createQueryBuilder.mockReturnValue(mockQB);

      const result = await service.byCountry('India');

      expect(result).toEqual({
        min: 10000,
        max: 30000,
        avg: 20000,
      });
    });

    it('should return 0 values when result is null', async () => {
      const mockQB: any = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(null),
      };

      repo.createQueryBuilder.mockReturnValue(mockQB);

      const result = await service.byCountry('India');

      expect(result).toEqual({
        min: 0,
        max: 0,
        avg: 0,
      });
    });
  });
});