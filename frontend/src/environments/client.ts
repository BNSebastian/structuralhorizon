export class Client {
  private static frontend: string = '';

  static home(): string {
    return `${this.frontend}/home`;
  }

  /** ERRORS
   **************************************/
  static getPageNotFoundError(): string {
    return `${this.frontend}/404`;
  }

  static getUnauthorizedAccessError(): string {
    return `${this.frontend}/401`;
  }

  /** AUTH
   **************************************/
  static signup(): string {
    return `${this.frontend}/user/signup`;
  }

  static login(): string {
    return `${this.frontend}/user/login`;
  }

  static profile(): string {
    return `${this.frontend}/user/profile`;
  }

  /** FEATURES
   **************************************/
  static getWarnings(): string {
    return `${this.frontend}/warnings`;
  }

  static getTurbines(): string {
    return `${this.frontend}/turbines`;
  }

  static updateTurbine(id: string): string {
    return `${this.frontend}/turbines/${id}`;
  }

  static getTypes(): string {
    return `${this.frontend}/types`;
  }

  static updateType(id: string): string {
    return `${this.frontend}/types/${id}`;
  }

  static getProjects(): string {
    return `${this.frontend}/projects`;
  }

  static getProject(id: string): string {
    return `${this.frontend}/projects/${id}`;
  }

  static getReports(): string {
    return `${this.frontend}/reports`;
  }

  static getTotalProjectReport(id: string): string {
    return `${this.frontend}/reports/totalProject/${id}`;
  }

  static getMonthlyProjectReport(id: string): string {
    return `${this.frontend}/reports/monthlyProject/${id}`;
  }

  static getWeeklyProjectReport(id: string): string {
    return `${this.frontend}/reports/weeklyProject/${id}`;
  }

  static getTotalTurbineReport(id: string): string {
    return `${this.frontend}/reports/totalTurbine/${id}`;
  }

  static getMonthlyTurbineReport(id: string): string {
    return `${this.frontend}/reports/monthlyTurbine/${id}`;
  }

  static getWeeklyTurbineReport(id: string): string {
    return `${this.frontend}/reports/weeklyTurbine/${id}`;
  }

  static getTotalUserReport(id: number): string {
    return `${this.frontend}/reports/totalUser/${id}`;
  }

  static getMonthlyUserReport(id: number): string {
    return `${this.frontend}/reports/monthlyUser/${id}`;
  }

  static getWeeklyUserReport(id: number): string {
    return `${this.frontend}/reports/weeklyUser/${id}`;
  }
}
