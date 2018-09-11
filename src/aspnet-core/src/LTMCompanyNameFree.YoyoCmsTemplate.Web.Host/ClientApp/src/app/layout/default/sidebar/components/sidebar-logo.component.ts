import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@shared/layout/menu-item';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { SettingsService } from '@yoyo/theme';

@Component({
    templateUrl: './sidebar-logo.component.html',
    styleUrls: ['./sidebar-logo.component.less'],
    selector: 'sidebar-logo'
})
export class SideBarLogoComponent extends AppComponentBase implements OnInit {
    isCollapsed: boolean = false;
    logoBgColor: string;

    constructor(
        injector: Injector,
        public settings: SettingsService
    ) {
        super(injector);
    }
    ngOnInit() {
        this.logoBgColor = '#1890ff';

        abp.event.on('abp.theme-setting.changed', (theme, logoBg) => {
            this.logoBgColor = logoBg;
        });
        abp.event.on('abp.theme-setting.collapsed', collapsed => {
            this.isCollapsed = collapsed;
        });
    }
}
