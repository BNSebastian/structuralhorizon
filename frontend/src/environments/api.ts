import { environment } from './environment';

export class Api {
  private static host: string = `${environment.API_PROTOCOL}://${environment.API_URL}:${environment.API_PORT}`;

  static auth: string = `${this.host}/api/auth`;
  static user: string = `${this.host}/api/user`;
  static type: string = `${this.host}/api/type`;
  static turbine: string = `${this.host}/api/turbine`;
  static project: string = `${this.host}/api/project`;
  static activity: string = `${this.host}/api/activity`;
  static warning: string = `${this.host}/api/warning`;
}
