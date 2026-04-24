import { IsNumber, IsString, Min } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    fullName: string;

    @IsString()
    jobTitle: string;

    @IsString()
    country: string;

    @IsNumber()
    @Min(1)
    salary: number;
}