import { Page } from '../../../shared/models/page';

export interface TypeDto {
  id: number;
  name: string;
}

export interface TypeCreateDto {
  name: string;
}

export interface TypeUpdateDto {
  id: number;
  name: string;
}

export interface TypePageDto extends Page<TypeDto> {}
