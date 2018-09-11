import { AppConsts } from '@shared/AppConsts';
import { Component, Input, AfterViewInit, Renderer2 } from '@angular/core';
import { LocalizationService } from '@yoyo/abp';
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
export class ValidationMessagesComponent implements AfterViewInit {
  @Input()
  formCtrl;
  @Input()
  errorDefs: any[] = [];

  private _localizationService: LocalizationService;
  constructor(private appLocalizationService: LocalizationService) {
    this._localizationService = appLocalizationService;
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
          required: AppConsts.l('ThisFieldIsRequired'),
        });
      }
      if (targetElement.getAttribute('minlength')) {
        this.errorDefs.push({
          minlength: AppConsts.l(
            'PleaseEnterAtLeastNCharacter',
            targetElement.getAttribute('minlength'),
          ),
        });
      }
      if (targetElement.getAttribute('maxlength')) {
        this.errorDefs.push({
          maxlength: AppConsts.l(
            'PleaseEnterNoMoreThanNCharacter',
            targetElement.getAttribute('maxlength'),
          ),
        });
      }

      // if (targetElement.getAttribute('pattern')) {
      //     this.errorDefs.push({ pattern: AppConsts.l('EnterFormatIsNotCorrect') });
      // }
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
