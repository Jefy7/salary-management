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

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });
});