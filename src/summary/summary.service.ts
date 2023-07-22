import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  getSummary() {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((acum, report) => acum + report.amount, 0);

    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((acum, report) => acum + report.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
