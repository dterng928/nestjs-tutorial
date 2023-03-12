import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUserId } from 'src/auth/decorators';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}
  @Get()
  getAllUserExpense(@GetUserId() userId: number) {
    return this.expenseService.getAllUserExpense(userId);
  }

  @Get(':id')
  getUserExpenseById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.getUserExpenseById(userId, expenseId);
  }

  @Post()
  createExpense(@GetUserId() userId: number, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(userId, dto);
  }

  @Patch(':id')
  updateUserExpenseById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateUserExpenseById(userId, expenseId, dto);
  }

  @Delete(':id')
  deleteUserExpenseById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.deleteUserExpenseById(userId, expenseId);
  }

  @Get()
  testGet() {
    return true;
  }
}
