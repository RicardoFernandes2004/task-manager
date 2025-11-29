import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    createTask(taskDto: TaskDto) {
        this.tasks.push(taskDto);
        return { message: 'Task created successfully', task: taskDto };
    }

    getAllTasks(): TaskDto[] {
        return this.tasks;
    }

    getTaskById(id: string): TaskDto {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    updateTask(id: string, updatedTask: Partial<TaskDto>): TaskDto {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        return this.tasks[taskIndex];
    }

    deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        this.tasks.splice(taskIndex, 1);
        return HttpStatus.OK === 200;
    }
    
    findTasksByParams(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter(task => {
            let match = true;
            if (params.title != undefined && !task.title.includes(params.title)) {
                match = false;
            }
            if (params.status != undefined && !task.status.includes(params.status)) {
                match = false;
            }
            return match;
        });
    }
}
