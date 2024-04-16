import { catchError, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Api } from '../../../../environments/api';
import { UserCreateDto, UserDto, UserPageDto } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = Api.user;
  private http = inject(HttpClient);

  /**
   * Creates a new entity in the API.
   * @param entity - the entity to create
   * @returns An Observable that emits the created entity
   */
  save(entity: UserCreateDto): Observable<UserCreateDto> {
    return this.http
      .post<UserCreateDto>(`${this.baseUrl}/save`, entity)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all entities from the API.
   * @returns An Observable that emits an array of entities.
   */
  getAll(): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>(`${this.baseUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves an entity by its ID from the API.
   * @param id - the ID of the entity to retrieve
   * @returns An Observable that emits the entity
   */
  getById(id: string): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${this.baseUrl}/getById?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates an existing entity in the API.
   * @param id - the ID of the entity to update
   * @param entity - the updated entity
   * @returns the updated entity
   */
  update(entity: UserDto): Observable<UserDto> {
    return this.http
      .put<UserDto>(`${this.baseUrl}/update`, entity)
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
   * @param offset - the index of the page to retrieve (zero-based)
   * @param pageSize - the size of the page to retrieve
   * @returns An Observable that emits an array of entities.
   */
  getPage(offset: number, pageSize: number): Observable<UserPageDto> {
    return this.http
      .get<UserPageDto>(
        `${this.baseUrl}/getPage?offset=${offset}&pageSize=${pageSize}`
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
