import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(@Body() body, @Param('type') type) {
    return this.appService.createReport(body, type);
  }

  @Put(':id')
  editReport(@Body() body, @Param('id') id, @Param('type') type) {
    return this.appService.editReport(body, id, type);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
