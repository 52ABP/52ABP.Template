import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { MenuItem } from '@shared/layout/menu-item';

import { AppComponentBase } from '@shared/app-component-base';
import { MenuService, Menu, SettingsService } from '@delon/theme';

@Component({
    selector: 'abp-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ["./sidebar-nav.component.less"]
})
export class SideBarNavComponent extends AppComponentBase implements OnInit {

    //菜单是通过MenuService中获取，设置菜单的位置在src/app/app.component.ts中。之所以这么干是因为在其他组件中需要获得菜单信息，因此将菜单数据放到服务中，以便共享给其他组件使用
    list: Menu[];
    isCollapsed: boolean = false;
    themeValue: string = 'light';

    constructor(
        injector: Injector,
        public settings: SettingsService,
        private menuService: MenuService
    ) {
        super(injector);

        this.list = this.menuService.menus;
    }

    ngOnInit() {
        // event.on
        abp.event.on('abp.theme-setting.changed', themeName => {
            switch (themeName) {
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                    this.themeValue = 'light';
                    break;
                default:
                    this.themeValue = 'dark';
                    break;
            }
        });
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}