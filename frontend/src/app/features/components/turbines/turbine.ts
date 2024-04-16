import { Page } from '../../../shared/models/page';

export interface TurbineDto {
  id: string;
  number: string;
  location: string;
  projects: string[];
}

export interface TurbineCreateDto {
  number: string;
  location: string;
}

export interface TurbineUpdateDto {
  id: string;
  number: string;
  location: string;
}

export interface TurbinePageDto extends Page<TurbineDto> {}
