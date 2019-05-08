using System.IO;
using Abp.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace LTMCompanyNameFree.YoyoCmsTemplate.Configuration
{
    public static class EnvironmentExtensions
    {
        /// <summary>
        /// 根据环境变量设置 appsettings
        /// </summary>
        /// <param name="env"></param>
        /// <returns></returns>
        public static IConfigurationRoot GetAppConfiguration(this IHostingEnvironment env)
        {
            return AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName, env.IsDevelopment());
        }

        /// <summary>
        /// 根据环境变量获取 log4net 的配置文件名称
        /// </summary>
        /// <param name="env"></param>
        /// <param name="defaultCfgFileName"></param>
        /// <returns></returns>
        public static string GetLog4NetConfigFileName(this IHostingEnvironment env, string defaultCfgFileName = "log4net")
        {
            var log4NetCfgFileName = $"{defaultCfgFileName}.config";

            if (!env.EnvironmentName.IsNullOrWhiteSpace())
            {
                var tmpName = $"{defaultCfgFileName}.{env.EnvironmentName}.config";

                if (File.Exists(Path.Combine(env.ContentRootPath, tmpName)))
                {
                    log4NetCfgFileName = tmpName;
                }
            }

            return log4NetCfgFileName;
        }
    }
}