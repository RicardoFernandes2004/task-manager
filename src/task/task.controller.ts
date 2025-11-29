import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { FindAllParameters, TaskDto } from './task.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    createTask(@Body() taskDto: TaskDto) {
        return this.taskService.createTask(taskDto);
    }

    @Get()
    getAllTasks(): TaskDto[] {
        return this.taskService.getAllTasks();
    }

    @Get('/search/:id')
    getTaskById(@Param('id') id: string): TaskDto | undefined {
        return this.taskService.getTaskById(id);
    }

    @Put('/:id')
    updateTask(@Param('id') id: string, @Body() updatedTask: Partial<TaskDto>): TaskDto {
        return this.taskService.updateTask(id, updatedTask);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): boolean {
        return this.taskService.deleteTask(id);
    }

    @Get('/search')
    findTasksByParams(@Query() params: Partial<FindAllParameters>): TaskDto[] {
        return this.taskService.findTasksByParams(params);
    }


}
