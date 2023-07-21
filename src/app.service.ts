import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { randomUUID } from 'crypto';

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
  getAllReports(type: ReportType) {
    if (type === ReportType.INCOME) {
      return data.report.filter((item) => item.type === ReportType.INCOME);
    }
    if (type === ReportType.EXPENSE) {
      return data.report.filter((item) => item.type === ReportType.EXPENSE);
    }

    return `Wrong type`;
  }

  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);
  }

  createReport(body: ReportData, type: ReportType) {
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

  editReport(body: UpdateReportData, id: string, type: ReportType) {
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

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((item) => item.id === id);

    if (reportIndex === -1) {
      return 'Not Found';
    }

    data.report.splice(reportIndex, 1);

    return `DELETED`;
  }
}
