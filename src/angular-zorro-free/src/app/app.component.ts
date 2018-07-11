import { Component, OnInit } from '@angular/core';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { AppComponentBase } from '@shared/app-component-base';
import { Injector } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { SettingsService, TitleService, MenuService, Menu } from '@delon/theme';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HostBinding } from '@angular/core';
import { NzModalService, NzNotificationService } from "ng-zorro-antd";
import { AppConsts } from '@shared/AppConsts';
import { MenuItem } from '@shared/layout/menu-item';



@Component({
  selector: 'app-app',
  templateUrl: './app.component.html'
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @HostBinding('class.layout-fixed')
  get isFixed() {
    return this.settings.layout.fixed;
  }
  @HostBinding('class.layout-boxed')
  get isBoxed() {
    return this.settings.layout.boxed;
  }
  @HostBinding('class.aside-collapsed')
  get isCollapsed() {
    return this.settings.layout.collapsed;
  }

  // 全局的菜单
  Menums = [
    // 首页
    new MenuItem(this.l("Home"), "", "anticon anticon-team", "/app/home"),
    // 租户
    new MenuItem(this.l("Tenants"), "Pages.Administration.Tenants", "anticon anticon-team", "/app/tenants"),
    // 角色
    new MenuItem(this.l("Roles"), "Pages.Administration.Roles", "anticon anticon-safety", "/app/roles"),
    // 用户
    new MenuItem(this.l("Users"), "Pages.Administration.Users", "anticon anticon-user", "/app/users"),
    // 关于我们
    new MenuItem(this.l("About"), "", "anticon anticon-global", "/app/about"),
  ]

  constructor(
    injector: Injector,
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
    private menuService: MenuService
  ) {
    super(injector);

    // 创建菜单
    var arrMenu = this.processMenu(this.Menums);
    this.menuService.add(arrMenu);

  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.titleSrv.setTitle());

    // 注册通知信息
    // SignalRAspNetCoreHelper.initSignalR();
    // 触发通知事件
    // abp.event.on('abp.notifications.received', userNotification => {
    //   abp.notifications.showUiNotifyForUserNotification(userNotification);

    //   // Desktop notification
    //   Push.create('AbpZeroTemplate', {
    //     body: userNotification.notification.data.message,
    //     icon: abp.appPath + 'assets/app-logo-small.png',
    //     timeout: 6000,
    //     onClick: function () {
    //       window.focus();
    //       this.close();
    //     },
    //   });
    // });
  }

  ngAfterViewInit(): void {
    // ($ as any).AdminBSB.activateAll();
    // ($ as any).AdminBSB.activateDemo();
  }

  // 处理生成菜单
  processMenu(menus: MenuItem[]): Array<Menu> {
    // abp.auth.isGranted
    const retMenu = new Array<Menu>();
    menus.forEach((item) => {
      if (!this.isGranted(item.permission)) {
        let subMenu: Menu;
        subMenu = {
          text: item.displayName,
          link: item.route,
          icon: `${item.icon}`
        };
        if (subMenu) {
          if (item.childMenus && item.childMenus.length > 0)
            subMenu.children = this.processMenu(item.childMenus);
          retMenu.push(subMenu);
        }
      }
    });
    return retMenu;
  }

}
