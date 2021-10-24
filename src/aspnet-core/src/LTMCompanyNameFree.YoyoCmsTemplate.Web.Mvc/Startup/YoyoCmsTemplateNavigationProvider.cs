using Abp.Application.Navigation;
using Abp.Authorization;
using Abp.Localization;
using LTMCompanyNameFree.YoyoCmsTemplate.Authorization;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Web.Startup
{
    /// <summary>
    /// This class defines menus for the application.
    /// </summary>
    public class YoyoCmsTemplateNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        PageNames.About,
                        L("About"),
                        url: "About",
                        icon: "fas fa-info-circle"
                    )
                )
                .AddItem(
                    new MenuItemDefinition(
                        PageNames.Home,
                        L("HomePage"),
                        url: "",
                        icon: "fas fa-home",
                        requiresAuthentication: true
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Tenants,
                        L("Tenants"),
                        url: "Tenants",
                        icon: "fas fa-building",
                        permissionDependency: new SimplePermissionDependency(PermissionNames.Pages_Tenants)
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Users,
                        L("Users"),
                        url: "Users",
                        icon: "fas fa-users",
                        permissionDependency: new SimplePermissionDependency(PermissionNames.Pages_Users)
                    )
                ).AddItem(
                    new MenuItemDefinition(
                        PageNames.Roles,
                        L("Roles"),
                        url: "Roles",
                        icon: "fas fa-theater-masks",
                        permissionDependency: new SimplePermissionDependency(PermissionNames.Pages_Roles)
                    )
                )
                .AddItem( // Menu items below is just for demonstration!
                    new MenuItemDefinition(
                        "MultiLevelMenu",
                        L("MultiLevelMenu"),
                        icon: "fas fa-circle"
                    ).AddItem(
                        new MenuItemDefinition(
                            "AspNetBoilerplate",
                            new FixedLocalizableString("52ABP"),
                            icon: "far fa-circle"
                        ).AddItem(
                            new MenuItemDefinition(
                                "AspNetBoilerplateHome",
                                new FixedLocalizableString("首页"),
                                url: "https://www.52abp.com?ref=abptmpl",
                                icon: "far fa-dot-circle"
                            )
                        ).AddItem(
                            new MenuItemDefinition(
                                "AspNetBoilerplateTemplates",
                                new FixedLocalizableString("项目模板"),
                                url: "https://www.52abp.com/Download",
                                icon: "far fa-dot-circle"
                            )
                        ).AddItem(
                            new MenuItemDefinition(
                                "AspNetBoilerplateSamples",
                                new FixedLocalizableString("52ABP-PRO"),
                                url: "https://www.52abp.com/Wiki/52abp/latest/Abp-Template-vs-52ABP-Pro",
                                icon: "far fa-dot-circle"
                            )
                        ).AddItem(
                            new MenuItemDefinition(
                                "AspNetBoilerplateDocuments",
                                new FixedLocalizableString("文档"),
                                url: "https://www.52abp.com/Wiki/52abp/latest/Index-Angular.md",
                                icon: "far fa-dot-circle"
                            )
                        ).AddItem(
                            new MenuItemDefinition(
                                "AspNetBoilerplateDocuments",
                                new FixedLocalizableString("源代码"),
                                url: "https://github.com/52ABP/YoyoCmsFree.Template",
                                icon: "far fa-dot-circle"
                            )
                        )
                    ) 
                );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, YoyoCmsTemplateConsts.LocalizationSourceName);
        }
    }
}
