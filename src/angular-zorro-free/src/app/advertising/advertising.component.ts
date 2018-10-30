import { Component, OnInit, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styles: []
})
export class AdvertisingComponent extends ModalComponentBase implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {

  }

}
