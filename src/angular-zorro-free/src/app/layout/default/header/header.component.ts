import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService) { }

  toggleCollapsedSideabar() {
    let collapsed = !this.settings.layout.collapsed;
    this.settings.setLayout('collapsed', collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
