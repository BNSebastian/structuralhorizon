import { Page } from '../../../shared/models/page';

export interface WarningDto {
  id: string;
  turbine: string;
  description: string;
  active: boolean;
}

export interface WarningCreateDto {
  turbine: string;
  description: string;
}

export interface WarningPageDto extends Page<WarningDto> {}
