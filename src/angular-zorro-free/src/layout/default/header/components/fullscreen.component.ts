import { Component, HostListener, Injector } from '@angular/core';
import * as screenfull from 'screenfull';
import { AppComponentBase } from '@shared/component-base';

@Component({
  selector: 'header-fullscreen',
  template: `
    <div (click)="_click()">
      <i nz-icon [type]="status ? 'fullscreen' : 'fullscreen-exit'"></i>
      {{ status ? l('ExitFullScreen') : l('FullScreen') }}
    </div>
  `,
  host: {
    '[class.d-block]': 'true',
  },
})
export class HeaderFullScreenComponent extends AppComponentBase {
  status = false;

  constructor(injector: Injector) {
    super(injector);
  }
  @HostListener('window:resize')
  _resize() {
    this.status = screenfull.isEnabled;
  }

  @HostListener('click')
  _click() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
