import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { randomUUID } from 'crypto';
import { ReportResponseDto } from './dtos/report.dto';

interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    const reportsArray = data.report.filter((item) => item.type === type);

    return reportsArray.map((item) => new ReportResponseDto(item));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(body: ReportData, type: ReportType): ReportResponseDto {
    const { source, amount } = body;

    const newReport = {
      id: randomUUID(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  editReport(
    body: UpdateReportData,
    id: string,
    type: ReportType,
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);

    if (!reportToUpdate) {
      return;
      // return 'Report Not found';
    }

    const reportToUpdateIndex = data.report.findIndex((item) => item.id === id);

    const reportUpdated = {
      ...reportToUpdate,
      ...body,
      updated_at: new Date(),
    };

    data.report[reportToUpdateIndex] = reportUpdated;

    return new ReportResponseDto(reportUpdated);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((item) => item.id === id);

    if (reportIndex === -1) {
      return 'Not Found';
    }

    data.report.splice(reportIndex, 1);

    return `DELETED`;
  }
}
