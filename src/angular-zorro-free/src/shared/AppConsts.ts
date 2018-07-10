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

    static overrideAbpMessage(nzModal: NzModalService) {
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
        // abp.message.confirm = (message: string, callback?: (result: boolean) => void) => {

        // }
        // abp.message.confirm = (message: string, title?: string, callback?: (result: boolean) => void) => {

        // }
    }

    static overrideAbpNotify(notify: NzNotificationService) {
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
}
