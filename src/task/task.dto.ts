import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, Max, MinLength } from "class-validator";


export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export class TaskDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @Max(255)
    title: string;

    @IsString()
    @MinLength(3)
    @Max(255)
    description: string;


    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;

    @IsDateString()
    expirationDate: Date;
    
}

export interface FindAllParameters {
    title?: string;
    status?: string;
}