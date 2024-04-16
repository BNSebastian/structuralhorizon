import { TurbineDto } from '../turbines/turbine';
import { TypeDto } from '../types/type';

export interface ActivityCreate {
  projectId: string;
  turbineId: string;
  userId: string;
  typeId: string;
  description: string;
  workPerformed: string;
  reasons: string;
  startedOn: string;
  endedOn: string;
}

export interface Activity {
  id: number;
  name: string;
}

export interface ActivityDto {
  id: string;
  user: string;
  description: string;
  workPerformed: string;
  reasons: string;
  startedOn: string;
  endedOn: string;
  turbine: TurbineDto;
  type: TypeDto;
}

export interface ActivityUpdate {
  id: number;
  name: string;
  description: string;
  startedOn: string;
  endedOn: string;
}
