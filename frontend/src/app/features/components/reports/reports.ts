export interface TotalProjectReportDto {
  project: string;
  type: string;
  minutes: number;
}

export interface TotalTurbineReportDto {
  turbine: string;
  type: string;
  minutes: number;
}

export interface TotalUserReportDto {
  user: string;
  type: string;
  minutes: number;
}

export interface MonthlyProjectReportDto {
  project: string;
  type: string;
  month: number;
  minutes: number;
}

export interface MonthlyTurbineReportDto {
  turbine: string;
  type: string;
  month: number;
  minutes: number;
}

export interface MonthlyUserReportDto {
  user: string;
  type: string;
  month: number;
  minutes: number;
}

export interface WeeklyProjectReportDto {
  project: string;
  type: string;
  week: number;
  minutes: number;
}

export interface WeeklyTurbineReportDto {
  turbine: string;
  type: string;
  week: number;
  minutes: number;
}

export interface WeeklyUserReportDto {
  user: string;
  type: string;
  week: number;
  minutes: number;
}
