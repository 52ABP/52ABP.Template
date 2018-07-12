import { NzModalService, NzNotificationService, NzNotificationDataOptions } from "ng-zorro-antd";

export class AppConsts {

    static remoteServiceBaseUrl: string;
    static appBaseUrl: string;

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'YoyoCmsTemplate'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };

    // 重写abp的msg
    static overrideAbpMessage(nzModal: NzModalService) {
        if ((<any>abp).nzModal) {
            return;
        }

        (<any>abp).nzModal = nzModal;
        abp.message.info = (message: string, title?: string) => {
            (<any>abp).nzModal.info({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        }

        abp.message.warn = (message: string, title?: string) => {
            (<any>abp).nzModal.warning({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        }
        abp.message.error = (message: string, title?: string) => {
            (<any>abp).nzModal.error({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        }
        abp.message.success = (message: string, title?: string) => {
            (<any>abp).nzModal.success({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        }
        abp.message.confirm = AppConsts.confirm;
    }

    // 重写abp的notify
    static overrideAbpNotify(notify: NzNotificationService) {
        if ((<any>abp).nzNotify) {
            return;
        }

        (<any>abp).nzNotify = notify;

        abp.notify.info = (message: string, title?: string, options?: any) => {
            (<any>abp).nzNotify.info(message, title, options);
        }
        abp.notify.warn = (message: string, title?: string, options?: any) => {
            (<any>abp).nzNotify.warning(message, title, options);
        }
        abp.notify.error = (message: string, title?: string, options?: any) => {
            (<any>abp).nzNotify.error(message, title, options);
        }
        abp.notify.success = (message: string, title?: string, options?: any) => {
            (<any>abp).nzNotify.success(message, title, options);
        }
    }

    // msg confirm
    private static confirm(message: string, callback?: (result: boolean) => void): any;
    private static confirm(message: string, title?: string, callback?: (result: boolean) => void, ): any;
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
                nzTitle: '确认操作',
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
}
