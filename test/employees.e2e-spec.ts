import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Employees (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        try {
            const moduleFixture: TestingModule =
                await Test.createTestingModule({
                    imports: [AppModule],
                }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();
        } catch (err) {
            console.error('Test setup failed:', err);
            throw err;
        }
    });

    it('should create an employee', async () => {
        const res = await request(app.getHttpServer())
            .post('/employees')
            .send({
                fullName: 'John Doe',
                jobTitle: 'Engineer',
                country: 'India',
                salary: 50000,
            });

        expect(res.status).toBe(201);
        expect(res.body.fullName).toBe('John Doe');
    });

    it('should return all employees', async () => {
        const res = await request(app.getHttpServer()).get('/employees');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return employee by id', async () => {
        const create = await request(app.getHttpServer())
            .post('/employees')
            .send({
                fullName: 'Alice',
                jobTitle: 'Manager',
                country: 'India',
                salary: 60000,
            });

        const id = create.body.id;

        const res = await request(app.getHttpServer()).get(`/employees/${id}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });
});