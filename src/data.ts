export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const data: Data = {
  report: [
    {
      id: 'b213803d-7ff9-47f8-8b41-27a5d97882a9',
      source: 'Salary',
      amount: 6000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: '3c341b18-2e14-4483-8d41-f7c61a4c68b4',
      source: 'Freelo',
      amount: 1200,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: '5659ff9e-e1eb-4028-b1aa-5b83ab274999',
      source: 'Gym',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}
