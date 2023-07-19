import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { data, ReportType } from './data';
import { randomUUID } from 'crypto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getAllReports(@Param('type') type: string) {
    if (type === ReportType.INCOME) {
      return data.report.filter((item) => item.type === ReportType.INCOME);
    }
    if (type === ReportType.EXPENSE) {
      return data.report.filter((item) => item.type === ReportType.EXPENSE);
    }

    return `Wrong type`;
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    return data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);
  }

  @Post()
  createReport(@Body() body, @Param('type') type) {
    const { source, amount } = body;

    if (type === ReportType.INCOME || ReportType.EXPENSE) {
      const newReport = {
        id: randomUUID(),
        source,
        amount,
        created_at: new Date(),
        updated_at: new Date(),
        type,
      };

      data.report.push(newReport);

      return newReport;
    } else {
      return 'Wrong type';
    }
  }

  @Put(':id')
  editReport(@Body() body, @Param('id') id, @Param('type') type) {
    const reportToUpdate = data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);

    if (!reportToUpdate) {
      return 'Report Not found';
    }

    const reportToUpdateIndex = data.report.findIndex((item) => item.id === id);

    const reportUpdated = {
      ...reportToUpdate,
      ...body,
      updated_at: new Date(),
    };

    data.report[reportToUpdateIndex] = reportUpdated;

    return reportUpdated;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((item) => item.id === id);

    if (reportIndex === -1) {
      return 'Not Found';
    }

    data.report.splice(reportIndex, 1);

    return `DELETED`;
  }
}
