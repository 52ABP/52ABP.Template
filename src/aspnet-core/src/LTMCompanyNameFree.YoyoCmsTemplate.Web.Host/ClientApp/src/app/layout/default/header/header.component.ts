import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '@yoyo/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService) { }

  toggleCollapsedSideabar() {
    const collapsed = !this.settings.layout.collapsed;
    this.settings.setLayout('collapsed', collapsed);
    abp.event.trigger('abp.theme-setting.collapsed', collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
