import { OnInit } from '@angular/core';
import { HostBinding } from '@angular/core';
import { SettingsService, TitleService } from '@delon/theme';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent implements OnInit {
  @HostBinding('class.layout-fixed')
  get isFixed() {
    return this.settings.layout.fixed;
  }
  @HostBinding('class.layout-boxed')
  get isBoxed() {
    return this.settings.layout.boxed;
  }
  @HostBinding('class.aside-collapsed')
  get isCollapsed() {
    return this.settings.layout.collapsed;
  }
  constructor(
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.titleSrv.setTitle());
  }
}
