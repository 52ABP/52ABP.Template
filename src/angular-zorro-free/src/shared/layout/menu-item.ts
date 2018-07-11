export class MenuItem {
    displayName: string = '';
    permission: string = '';
    icon: string = '';
    route: string = '';
    childMenus: MenuItem[];

    constructor(displayName: string, permission: string, icon: string, route: string, childMenus: MenuItem[] = null) {
        this.displayName = displayName;
        this.permission = permission;
        this.icon = icon;
        this.route = route;

        if (childMenus) {
            this.childMenus = childMenus;
        } else {
            this.childMenus = [];
        }
    }
}
