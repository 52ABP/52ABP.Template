export class MenuItem {
    displayName: string = '';
    permission: string = '';
    icon: string = '';
    route: string = '';
    childMenus: MenuItem[];

    hide: boolean = false;

    constructor(displayName: string, permission: string, icon: string, route: string, childMenus: MenuItem[] = null, hide: boolean = false) {
        this.displayName = displayName;
        this.permission = permission;
        this.icon = icon;
        this.route = route;
        this.hide = hide

        if (childMenus) {
            this.childMenus = childMenus;
        } else {
            this.childMenus = [];
        }
    }
}
