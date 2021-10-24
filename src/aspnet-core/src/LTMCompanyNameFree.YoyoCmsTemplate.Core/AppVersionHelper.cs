using System;
using System.IO;
using Abp.Reflection.Extensions;

namespace LTMCompanyNameFree.YoyoCmsTemplate
{
    /// <summary>
    ///应用程序版本的中心点。
    /// </summary>
    public class AppVersionHelper
    {
        /// <summary>
        /// 获取应用程序的当前版本。
        /// 它也显示在网页上。
        /// </summary>
        public const string Version = "5.0.0";

        /// <summary>
        ///获取应用程序的发布(最后版本)日期。
        /// 它显示在网页上。
        /// </summary>
        public static DateTime ReleaseDate
        {
            get { return new FileInfo(typeof(AppVersionHelper).GetAssembly().Location).LastWriteTime; }
        }
    }
}
