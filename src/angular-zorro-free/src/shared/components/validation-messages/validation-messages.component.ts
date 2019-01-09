import { LocalizationService } from '@shared/i18n/localization.service';
import { AppConsts } from '@shared/AppConsts';
import { Component, Input, AfterViewInit, Renderer2, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';


@Component({
  selector: 'validation-messages',
  template: `
    <ng-container *ngIf="formCtrl.invalid && formCtrl.dirty">
        <div *ngFor="let errorDef of errorDefs">
           <span *ngIf="getErrorDefinitionIsValid(errorDef)">
                 {{getErrorDefinitionMessage(errorDef)}}
            </span>
        </div>
  </ng-container>
    `,
})
export class ValidationMessagesComponent extends AppComponentBase implements AfterViewInit {
  @Input()
  formCtrl;
  @Input()
  errorDefs: any[] = [];


  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let targetElement = document.querySelector(
        '[name=\'' + this.formCtrl.name + '\']',
      );
      if (!targetElement) {
        return;
      }
      targetElement = <HTMLElement>targetElement;

      if (
        targetElement.getAttribute('required') ||
        targetElement.getAttributeNode('required')
      ) {
        this.errorDefs.push({
          required: this.l('ThisFieldIsRequired'),
        });
      }
      if (targetElement.getAttribute('minlength')) {
        this.errorDefs.push({
          minlength: this.l('PleaseEnterAtLeastNCharacter', targetElement.getAttribute('minlength'),
          ),
        });
      }
      if (targetElement.getAttribute('maxlength')) {
        this.errorDefs.push({
          maxlength: this.l('PleaseEnterNoMoreThanNCharacter', targetElement.getAttribute('maxlength'),
          ),
        });
      }
    });
  }

  getErrorDefinitionIsValid(errorDef: any): boolean {
    return !!this.formCtrl.errors[Object.keys(errorDef)[0]];
  }

  getErrorDefinitionMessage(errorDef: any): any {
    return errorDef[Object.keys(errorDef)[0]];
  }

  addValidationDefinitionIfNotExists(
    validationKey: string,
    validationMessage: string,
  ): void {
    if (this.errorDefs[validationKey]) {
      return;
    }

    this.errorDefs.push({ validationKey: validationMessage });
  }
}
