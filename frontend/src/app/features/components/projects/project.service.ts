import { catchError, Observable, tap, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Api } from '../../../../environments/api';
import { UserDto } from '../../../core/auth/models/user';
import {
  ProjectCreateDto,
  ProjectDto,
  ProjectPageDto,
  ProjectUpdateDto,
} from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string = Api.project;
  private http = inject(HttpClient);

  save(entity: ProjectCreateDto): Observable<ProjectDto> {
    return this.http
      .post<ProjectDto>(`${this.baseUrl}/save`, entity)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all entities from the API.
   * @returns An Observable that emits an array of entities.
   */
  getAll(): Observable<ProjectDto[]> {
    return this.http
      .get<ProjectDto[]>(`${this.baseUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves an entity by its ID from the API.
   * @param id - the ID of the entity to retrieve
   * @returns An Observable that emits the entity
   */
  getById(id: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.baseUrl}/getById?id=${id}`).pipe(
      tap((response) => {
        console.log(
          `ProjectService::getById: retrieved entity with id ${id}:`,
          response
        );
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Updates an existing entity in the API.
   * @param id - the ID of the entity to update
   * @param entity - the updated entity
   * @returns the updated entity
   */
  update(entity: ProjectUpdateDto): Observable<ProjectDto> {
    return this.http
      .put<ProjectDto>(`${this.baseUrl}/update`, entity)
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
  getPage(pageIndex: number, pageSize: number): Observable<ProjectPageDto> {
    return this.http
      .get<ProjectPageDto>(
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

  addUserToProject(projectId: string, userId: string): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>(
        `${this.baseUrl}/addUserToProject?projectId=${projectId}&userId=${userId}`
      )
      .pipe(catchError(this.handleError));
  }

  removeUserFromProject(
    projectId: string,
    userId: string
  ): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>(
        `${this.baseUrl}/removeUserFromProject?projectId=${projectId}&userId=${userId}`
      )
      .pipe(catchError(this.handleError));
  }

  addTurbineToProject(
    projectId: string,
    turbineId: string
  ): Observable<ProjectDto[]> {
    return this.http
      .get<ProjectDto[]>(
        `${this.baseUrl}/addTurbineToProject?projectId=${projectId}&turbineId=${turbineId}`
      )
      .pipe(catchError(this.handleError));
  }

  removeTurbineFromProject(
    projectId: string,
    turbineId: string
  ): Observable<ProjectDto[]> {
    return this.http
      .get<ProjectDto[]>(
        `${this.baseUrl}/removeTurbineFromProject?projectId=${projectId}&turbineId=${turbineId}`
      )
      .pipe(catchError(this.handleError));
  }
}
