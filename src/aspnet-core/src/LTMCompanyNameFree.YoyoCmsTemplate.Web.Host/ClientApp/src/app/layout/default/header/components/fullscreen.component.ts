import { Component, HostListener, Injector } from '@angular/core';
import * as screenfull from 'screenfull';
import { AppComponentBase } from '@shared/component-base/app-component-base';

@Component({
  selector: 'header-fullscreen',
  template: `
  <div (click)="click()">
    <i class="anticon anticon-{{status ? 'shrink' : 'arrows-alt'}}" ></i>
    {{ status ? l('ExitFullScreen') : l('FullScreen') }}
  </div>
  `
})
export class HeaderFullScreenComponent extends AppComponentBase {
  status = false;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  @HostListener('window:resize')
  _resize() {
    this.status = screenfull.isFullscreen;
  }

  click() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
