import { Component } from '@angular/core';

import { WarningListComponent } from '../../components/warnings/warning-list/warning-list.component';

@Component({
  selector: 'app-warning-page',
  templateUrl: './warning-page.component.html',
  standalone: true,
  imports: [WarningListComponent],
})
export class WarningPageComponent {}
