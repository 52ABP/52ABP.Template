import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { TenantChangeModalComponent } from './tenant-change-modal.component';

@Component({
    selector: 'tenant-change',
    templateUrl: './tenant-change.component.html',
})
export class TenantChangeComponent extends AppComponentBase implements OnInit {
    tenancyName: string;
    name: string;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        if (this.appSession.tenant) {
            this.tenancyName = this.appSession.tenant.tenancyName;
            this.name = this.appSession.tenant.name;
        }
    }

    get isMultiTenancyEnabled(): boolean {
        return abp.multiTenancy.isEnabled;
    }

    showChangeModal(): void {
        this.modalHelper.open(TenantChangeModalComponent, { tenancyName: this.tenancyName }, 'md')
            .subscribe((res) => {
                if (res) {
                    window.location.reload();
                }
            });
    }
}
