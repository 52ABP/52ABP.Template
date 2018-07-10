// import { Component, OnInit, ViewChild, Injector, ElementRef } from '@angular/core';
// import { AppComponentBase } from '@shared/component-base';
// import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
// import { IsTenantAvailableInput } from '@shared/service-proxies/service-proxies';
// import { AppTenantAvailabilityState } from '@shared/AppEnums';

// import { Abp } from '@abp';

// @Component({
//     selector: 'tenantChangeModal',
//     templateUrl: './tenant-change-modal.component.html'
// })
// export class TenantChangeModalComponent extends AppComponentBase {

//     // @ViewChild('tenantChangeModal') modal: ModalDirective;
//     @ViewChild('tenancyNameInput') tenancyNameInput: ElementRef;
//     @ViewChild('modalContent') modalContent: ElementRef;

//     tenancyName: string = '';
//     active: boolean = false;
//     saving: boolean = false;

//     constructor(
//         private _accountService: AccountServiceProxy,
//         injector: Injector
//     ) {
//         super(injector);
//     }

//     show(tenancyName: string): void {
//         this.tenancyName = tenancyName;
//         this.active = true;
//         // this.modal.show();
//     }

//     save(): void {

//         if (!this.tenancyName) {
//             Abp.multiTenancy.setTenantIdCookie(undefined);;
//             this.close();
//             location.reload();
//             return;
//         }

//         var input = new IsTenantAvailableInput();
//         input.tenancyName = this.tenancyName;

//         this.saving = true;
//         this._accountService.isTenantAvailable(input)
//             .finally(() => { this.saving = false; })
//             .subscribe((result) => {
//                 switch (result.state) {
//                     case AppTenantAvailabilityState.Available:
//                         Abp.multiTenancy.setTenantIdCookie(result.tenantId);
//                         this.close();
//                         location.reload();
//                         return;
//                     case AppTenantAvailabilityState.InActive:
//                         this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
//                         break;
//                     case AppTenantAvailabilityState.NotFound: //NotFound
//                         this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName));
//                         break;
//                 }
//             });
//     }

//     close(): void {
//         this.active = false;
//         // this.modal.hide();
//     }
// }
