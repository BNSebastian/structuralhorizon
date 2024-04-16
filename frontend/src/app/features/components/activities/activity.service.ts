import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '../../../../environments/api';
import {
  MonthlyProjectReportDto, MonthlyTurbineReportDto, MonthlyUserReportDto, TotalProjectReportDto,
  TotalTurbineReportDto, TotalUserReportDto, WeeklyProjectReportDto, WeeklyTurbineReportDto,
  WeeklyUserReportDto
} from '../reports/reports';
import { ActivityCreate, ActivityDto, ActivityUpdate } from './activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl: string = Api.activity;
  private serviceName: string = 'ActivityService';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * Creates a new entity in the API.
   * @param request - the entity to create
   * @returns An Observable that emits the created entity
   */
  save(request: ActivityCreate): Observable<ActivityCreate> {
    console.log(`${this.serviceName}::save: sending request: `, request);
    return this.http.post<ActivityCreate>(`${this.baseUrl}/save`, request).pipe(
      tap((response) => {
        console.log(
          `${this.serviceName}::save: got the following response:`,
          response
        );
      }),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<ActivityDto[]> {
    const userId = this.cookieService.get('userId');
    const url = `${Api.activity}/${userId}`;
    return this.http.get<ActivityDto[]>(url);
  }

  adminGetAll(): Observable<ActivityDto[]> {
    return this.http.get<ActivityDto[]>(Api.activity);
  }

  getById(id: number): Observable<ActivityDto> {
    return this.http.get<ActivityDto>(`${Api.activity}/getById/${id}`);
  }

  update(entity: ActivityUpdate): Observable<ActivityUpdate> {
    const url = `${Api.activity}`;
    return this.http.put<ActivityUpdate>(url, entity).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  deleteById(id: number): Observable<void> {
    const url = `${Api.activity}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getMonthlyProjectReports(id: string): Observable<MonthlyProjectReportDto[]> {
    return this.http
      .get<MonthlyProjectReportDto[]>(
        `${this.baseUrl}/reports/getMonthlyProjectReports?projectId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getMonthlyTurbineReports(id: string): Observable<MonthlyTurbineReportDto[]> {
    return this.http
      .get<MonthlyTurbineReportDto[]>(
        `${this.baseUrl}/reports/getMonthlyTurbineReports?turbineId=${id}`
      )
      .pipe(catchError(this.handleError));
  }
  getMonthlyUserReports(id: string): Observable<MonthlyUserReportDto[]> {
    return this.http
      .get<MonthlyUserReportDto[]>(
        `${this.baseUrl}/reports/getMonthlyUserReports?userId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getWeeklyProjectReports(id: string): Observable<WeeklyProjectReportDto[]> {
    return this.http
      .get<WeeklyProjectReportDto[]>(
        `${this.baseUrl}/reports/getWeeklyProjectReports?projectId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getWeeklyTurbineReports(id: string): Observable<WeeklyTurbineReportDto[]> {
    return this.http
      .get<WeeklyTurbineReportDto[]>(
        `${this.baseUrl}/reports/getWeeklyTurbineReports?turbineId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getWeeklyUserReports(id: string): Observable<WeeklyUserReportDto[]> {
    return this.http
      .get<WeeklyUserReportDto[]>(
        `${this.baseUrl}/reports/getWeeklyUserReports?userId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getTotalProjectReports(id: string): Observable<TotalProjectReportDto[]> {
    return this.http
      .get<TotalProjectReportDto[]>(
        `${this.baseUrl}/reports/getTotalProjectReports?projectId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getTotalTurbineReports(id: string): Observable<TotalTurbineReportDto[]> {
    return this.http
      .get<TotalTurbineReportDto[]>(
        `${this.baseUrl}/reports/getTotalTurbineReports?turbineId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  getTotalUserReports(id: string): Observable<TotalUserReportDto[]> {
    return this.http
      .get<TotalUserReportDto[]>(
        `${this.baseUrl}/reports/getTotalUserReports?userId=${id}`
      )
      .pipe(catchError(this.handleError));
  }

  checkTimeFrame(startedOn: string, endedOn: string): Observable<boolean> {
    return this.http
      .get<boolean>(
        `${this.baseUrl}/checkTimeFrame?startedOn=${startedOn}&endedOn=${endedOn}`
      )
      .pipe(catchError(this.handleError));
  }
}
