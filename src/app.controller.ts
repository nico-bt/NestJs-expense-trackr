import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getAllReports(@Param('type') type) {
    return `Reports of type: ${type}`;
  }

  @Get(':id')
  getReportById(@Param('id') id) {
    return `report with id: ${id}`;
  }

  @Post()
  createReport(@Body() body, @Param('type') type) {
    return `CREATE Report with type: ${type} and amount: ${body.amount}`;
  }

  @Put(':id')
  editReport(@Body() body, @Param('id') id, @Param('type') type) {
    return `Edit Income in report with id: ${id}, amount: ${body.amount} and type: ${type}`;
  }

  @Delete(':id')
  deleteReport(@Param('id') id, @Param('type') type) {
    return `DELETE REPORT WITH ID: ${id}`;
  }
}
