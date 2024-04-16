import { UserDto } from '../../../core/auth/models/user';
import { Page } from '../../../shared/models/page';
import { ActivityDto } from '../activities/activity';
import { TurbineDto } from '../turbines/turbine';

export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  users: UserDto[];
  activities: ActivityDto[];
  turbines: TurbineDto[];
}

export interface ProjectCreateDto {
  name: string;
  description: string;
}

export interface ProjectUpdateDto {
  id: string;
  name: string;
  description: string;
}

export interface ProjectPageDto extends Page<ProjectDto> {}
