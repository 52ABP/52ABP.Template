import { Component, OnInit, ViewChild, Injector, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { IsTenantAvailableInput } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';


@Component({
    selector: 'tenantChangeModal',
    templateUrl: './tenant-change-modal.component.html'
})
export class TenantChangeModalComponent extends ModalFormComponentBase implements OnInit {

    @Input() tenancyName: string = '';

    saving: boolean = false;

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            tenancyName: ['', [Validators.required]],
        });
    }

    save(): void {
        if (!this.tenancyName) {
            abp.multiTenancy.setTenantIdCookie(undefined);;
            this.close();
            location.reload();
            return;
        }

        var input = new IsTenantAvailableInput();
        input.tenancyName = this.tenancyName;

        this.saving = true;
        this._accountService.isTenantAvailable(input)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {
                switch (result.state) {
                    case AppTenantAvailabilityState.Available:
                        abp.multiTenancy.setTenantIdCookie(result.tenantId);
                        this.success();
                        location.reload();
                        return;
                    case AppTenantAvailabilityState.InActive:
                        this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
                        break;
                    case AppTenantAvailabilityState.NotFound: //NotFound
                        this.message.warn(this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName));
                        break;
                }
            });
    }
}
