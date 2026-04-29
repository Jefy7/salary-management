import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Salary (e2e)', () => {
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

    it('should calculate salary for India (10%)', async () => {
        const create = await request(app.getHttpServer())
            .post('/employees')
            .send({
                fullName: 'Raj',
                jobTitle: 'Engineer',
                country: 'India',
                salary: 50000,
            });

        const res = await request(app.getHttpServer())
            .get(`/salary/${create.body.id}`);

        expect(res.body.net).toBe(45000);
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });
});