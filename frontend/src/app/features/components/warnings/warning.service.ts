import { catchError, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '../../../../environments/api';
import { WarningCreateDto, WarningDto, WarningPageDto } from './warning';

@Injectable({
  providedIn: 'root',
})
export class WarningService {
  private baseUrl: string = Api.warning;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new entity in the API.
   * @param entity - the entity to create
   * @returns An Observable that emits the created entity
   */
  save(entity: WarningCreateDto): Observable<WarningDto> {
    return this.http
      .post<WarningDto>(`${this.baseUrl}/save`, entity)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all entities of type Warning from the API.
   * @returns An Observable that emits an array of entities.
   */
  getAll(): Observable<WarningDto[]> {
    return this.http
      .get<WarningDto[]>(`${this.baseUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves an entity of type Warning by its ID from the API.
   * @param id - the ID of the entity to retrieve
   * @returns An Observable that emits the entity of type Warning
   */
  getById(id: string): Observable<WarningDto> {
    return this.http
      .get<WarningDto>(`${this.baseUrl}/getById/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates an existing entity in the API.
   * @param id - the ID of the entity to update
   * @param entity - the updated entity
   * @returns the updated entity
   */
  update(entity: WarningDto): Observable<WarningDto> {
    return this.http
      .put<WarningDto>(`${this.baseUrl}/update`, entity)
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes an entity of type Warning by its ID from the API.
   * @param id - the ID of the entity to delete
   * @returns an Observable that emits nothing
   */
  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves the total number of entities of type Warning in the API.
   * @returns An Observable that emits the total number of entities of type Warning.
   */
  getCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/count`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves a page of entities of type Warning from the API.
   * @param pageIndex - the index of the page to retrieve (zero-based)
   * @param pageSize - the size of the page to retrieve
   * @returns An Observable that emits an array of entities of type Warning.
   */
  getPage(pageIndex: number, pageSize: number): Observable<WarningPageDto> {
    return this.http
      .get<WarningPageDto>(
        `${this.baseUrl}/getPage?pageIndex=${pageIndex}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
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
}
