﻿using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Authorization
{
    public class YoyoCmsTemplateAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_AuditLogs, L("AuditLogs"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, YoyoCmsTemplateConsts.LocalizationSourceName);
        }
    }
}
