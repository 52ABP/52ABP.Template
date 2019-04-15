import { Injectable } from '@angular/core';
import { AlainI18NService, SettingsService, DelonLocaleService, MenuService } from '@delon/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppConsts } from '@shared/AppConsts';

@Injectable({ providedIn: 'root' })
export class LocalizationService implements AlainI18NService {

    [key: string]: any;

    private change$ = new BehaviorSubject<string>(null);

    constructor(
    ) {

    }
    use(lang: string, emit?: boolean): void {

    }
    getLangs(): any[] {
        return this.langs;
    }
    get change(): Observable<string> {
        return this.change$.asObservable().pipe(filter(w => w != null));
    }

    fanyi(key: string, interpolateParams?: Object, isSafe?: boolean): string {
        return this.localization(key, null)
    }

    /**
     * ABP的本地化翻译
     * @param key 国际化键值
     * @param sourceName 语言源
     */
    localization(key: string, sourceName: string): string {
        sourceName = sourceName || AppConsts.localization.defaultLocalizationSourceName;
        return abp.localization.localize(key, sourceName);
    }


    /**
     * 填充参数到字符串占位符 如: 你好{0} -> 你好世界
     * @param str 有占位符的模板
     * @param args 参数
     */
    formatString(str: string, args: any[]): string {
        let result: string = str;
        for (var i = 0; i < args.length; i++) {
            var placeHolder = '{' + i + '}';
            result = this.replaceAll(result, placeHolder, args[i]);
        }
        return result;
    }

    private replaceAll(str, search, replacement): string {
        let fix = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(fix, 'g'), replacement);
    };

    /**
   * 填充数据
   * @param localization
   */
    extend(localization) {
        this.languages = localization.languages;
        this.currentLanguage = localization.currentLanguage;
    }

}
