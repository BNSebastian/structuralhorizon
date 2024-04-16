import { Page } from '../../../shared/models/page';

export interface UserDto {
  id: string;
  name: string;
  projects: string[];
}

export interface UserCreateDto {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface UserUpdateDto {
  id: string;
  email: string;
  name: string;
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

export interface UserPageDto extends Page<UserDto> {}
