import {
    Component,
    ElementRef,
    Renderer2,
    Inject,
    OnInit,
    OnDestroy,
    HostListener,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, LocationStrategy } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService, SettingsService, Menu } from '@delon/theme';
import { ReuseTabService } from '@delon/abc';
import { Nav } from '@delon/abc/sidebar-nav/sidebar-nav.types';

const SHOWCLS = 'nav-floating-show';
const FLOATINGCLS = 'nav-floating';

@Component({
    selector: 'yoyo-sidebar-nav',
    templateUrl: './yoyo-sidebar-nav.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Default,
    preserveWhitespaces: false,
})
export class YoYoSidebarNavComponent implements OnInit, OnDestroy {


    private change$: Subscription;

    list: Nav[] = [];

    constructor(
        public menuService: MenuService,
        public settings: SettingsService,
        public reuseTabService: ReuseTabService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        this.click(null);
    }

    ngOnInit(): void {
        this.change$ = <any>this.menuService.change.subscribe(res => {
            this.list = res;
            this.processMenuOpen(this.reuseTabService.curUrl, this.list);
            this.cd.detectChanges();
        });
    }

    get collapsed() {
        return this.settings.layout.collapsed;
    }

    hasChildren(item: Nav): boolean {
        if (item.children && item.children.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * 处理菜单展开状态
     */
    processMenuOpen(currentUrl: string, menus: Nav[], parentMenu?: Nav): void {
        menus.forEach(item => {
            if (parentMenu && item.link === currentUrl) {
                parentMenu._open = true;
            }
            if (item.children && item.children.length > 0) {
                this.processMenuOpen(currentUrl, item.children, item);
            }
        });
    }


    private get isPad(): boolean {
        return window.innerWidth < 768;
    }

    click(item: Nav) {
        if (this.isPad && !this.collapsed) {
            this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
        }
    }

    ngOnDestroy(): void {
        if (this.change$) {
            this.change$.unsubscribe();
        }
    }

}
