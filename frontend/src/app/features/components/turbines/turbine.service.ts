import { catchError, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Api } from '../../../../environments/api';
import {
  TurbineCreateDto,
  TurbineDto,
  TurbinePageDto,
  TurbineUpdateDto,
} from './turbine';

@Injectable({
  providedIn: 'root',
})
export class TurbineService {
  private baseUrl: string = Api.turbine;
  private http = inject(HttpClient);

  save(entity: TurbineCreateDto): Observable<TurbineDto> {
    return this.http
      .post<TurbineDto>(`${this.baseUrl}/save`, entity)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all entities from the API.
   * @returns An Observable that emits an array of entities.
   */
  getAll(): Observable<TurbineDto[]> {
    return this.http
      .get<TurbineDto[]>(`${this.baseUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves an entity by its ID from the API.
   * @param id - the ID of the entity to retrieve
   * @returns An Observable that emits the entity
   */
  getById(id: string): Observable<TurbineDto> {
    return this.http
      .get<TurbineDto>(`${this.baseUrl}/getById?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates an existing entity in the API.
   * @param id - the ID of the entity to update
   * @param entity - the updated entity
   * @returns the updated entity
   */
  update(entity: TurbineUpdateDto): Observable<TurbineDto> {
    return this.http
      .put<TurbineDto>(`${this.baseUrl}/update`, entity)
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes an entity by its ID from the API.
   * @param id - the ID of the entity to delete
   * @returns an Observable that emits nothing
   */
  delete(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.baseUrl}/delete?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves a page of entities from the API.
   * @param pageIndex - the index of the page to retrieve (zero-based)
   * @param pageSize - the size of the page to retrieve
   * @returns An Observable that emits an array of entities.
   */
  getPage(pageIndex: number, pageSize: number): Observable<TurbinePageDto> {
    return this.http
      .get<TurbinePageDto>(
        `${this.baseUrl}/getPage?pageIndex=${pageIndex}&pageSize=${pageSize}`
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles errors that occur during HTTP requests.
   *
   * @param error - The error that occurred during the HTTP request.
   * @returns An Observable that emits an error.
   */
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
