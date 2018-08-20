import { state } from '@angular/animations';
import {
  NzModalService,
  NzNotificationService,
  NzNotificationDataOptions,
  NzMessageService,
} from 'ng-zorro-antd';
import { parse } from 'date-fns';

export class AppConsts {
  static remoteServiceBaseUrl: string;

  static appBaseUrl: string;
  static uploadApiUrl = '/api/File/Upload';

  static readonly userManagement = {
    defaultAdminUserName: 'admin',
  };

  static readonly localization = {
    defaultLocalizationSourceName: 'YoyoCmsTemplate',
  };

  static readonly authorization = {
    encrptedAuthTokenName: 'enc_auth_token',
  };
  static maxProfilPictureMb = 1; // 个人头像上传最大MB

  // // 封装个建议的本地化方法
  // static L(key: string): string {
  //   return abp.localization.localize(
  //     key,
  //     AppConsts.localization.defaultLocalizationSourceName,
  //   );
  // }
  static l(key: string, ...args: any[]): string {
    let localizedText = abp.localization.localize(
      key,
      AppConsts.localization.defaultLocalizationSourceName,
    );

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }

  //  覆盖abp.message替换为ng-zorro的全局message

  static overrideAbpMessageByMini(
    _nzMessageService: NzMessageService,
    _nzModalService?: NzModalService,
  ) {
    if (_nzModalService) {
      if ((<any>abp).nzModal) {
        return;
      }

      (<any>abp).nzModal = _nzModalService;
    }
    if ((<any>abp).nzMessage) {
      return;
    }
    (<any>abp).nzMessage = _nzMessageService;

    abp.message.info = (message: string, title?: string) => {
      //   const timingCounts = parseInt(title, 0);
      // (<any>abp).nzMessage.info(message, { nzDuration: timingCounts });
      (<any>abp).nzMessage.info(message);
    };

    abp.message.warn = (message: string, title?: string) => {
      (<any>abp).nzMessage.warning(message);
    };
    abp.message.error = (message: string, title?: string) => {
      (<any>abp).nzMessage.error(message);
    };
    abp.message.success = (message: string, title?: string) => {
      (<any>abp).nzMessage.success(message);
    };
    abp.message.confirm = AppConsts.confirm;
  }

  // 覆盖abp.message替换为ng-zorro的模态框
  static overrideAbpMessageByNgModal(_nzModalService: NzModalService) {
    if ((<any>abp).nzModal) {
      return;
    }

    (<any>abp).nzModal = _nzModalService;

    abp.message.info = (message: string, title?: string) => {
      (<any>abp).nzModal.info({
        nzTitle: title,
        nzContent: message,
        nzMask: true,
      });
    };

    abp.message.warn = (message: string, title?: string) => {
      (<any>abp).nzModal.warning({
        nzTitle: title,
        nzContent: message,
        nzMask: true,
      });
    };
    abp.message.error = (message: string, title?: string) => {
      (<any>abp).nzModal.error({
        nzTitle: title,
        nzContent: message,
        nzMask: true,
      });
    };
    abp.message.success = (message: string, title?: string) => {
      (<any>abp).nzModal.success({
        nzTitle: title,
        nzContent: message,
        nzMask: true,
      });
    };
    abp.message.confirm = AppConsts.confirm;
  }

  // 覆盖abp.message替换为ng-zorro的notify
  static overrideAbpNotify(_nzNotificationService: NzNotificationService) {
    if ((<any>abp).nzNotify) {
      return;
    }

    (<any>abp).nzNotify = _nzNotificationService;

    abp.notify.info = (message: string, title?: string, options?: any) => {
      (<any>abp).nzNotify.info(message, title, options);
    };
    abp.notify.warn = (message: string, title?: string, options?: any) => {
      (<any>abp).nzNotify.warning(message, title, options);
    };
    abp.notify.error = (message: string, title?: string, options?: any) => {
      (<any>abp).nzNotify.error(message, title, options);
    };
    abp.notify.success = (message: string, title?: string, options?: any) => {
      (<any>abp).nzNotify.success(message, title, options);
    };
  }

  // msg confirm
  private static confirm(
    message: string,
    callback?: (result: boolean) => void,
  ): any;

  private static confirm(
    message: string,
    title?: string,
    callback?: (result: boolean) => void,
  ): any;

  private static confirm(
    message: string,
    titleOrCallBack?: string | ((result: boolean) => void),
    callback?: (result: boolean) => void,
  ): any {
    if (typeof titleOrCallBack === 'string') {
      (<any>abp).nzModal.confirm({
        nzTitle: titleOrCallBack,
        nzContent: message,
        nzOnOk() {
          if (callback) callback(true);
        },
        nzOnCancel() {
          if (callback) callback(false);
        },
      });
    } else {
      (<any>abp).nzModal.confirm({
        nzTitle: abp.localization.localize(
          'MessageConfirmOperation',
          AppConsts.localization.defaultLocalizationSourceName,
        ),
        nzContent: message,
        nzOnOk() {
          if (titleOrCallBack) titleOrCallBack(true);
        },
        nzOnCancel() {
          if (titleOrCallBack) titleOrCallBack(false);
        },
      });
    }
  }

  /**
   * 数据表格设置
   */
  // tslint:disable-next-line:member-ordering
  static readonly grid = {
    /**
     * 每页显示条目数
     */
    defaultPageSize: 10,
    /**
     * 每页显示条目数下拉框值
     */
    defaultPageSizes: [5, 10, 15, 20, 25, 30, 50, 80, 100],
  };
}
