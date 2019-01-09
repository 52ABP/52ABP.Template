import { NzNotificationService, NzModalService, NzMessageService } from "ng-zorro-antd";

export class MessageExtension {
    /**
     * 覆盖abp.message替换为ng-zorro的全局message
     * @param _nzMessageService 
     * @param _nzModalService 
     */

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
        abp.message.confirm = this.confirm;
    }

    /**
     * 覆盖abp.message替换为ng-zorro的模态框
     * @param _nzModalService 
     */
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
        abp.message.confirm = this.confirm;
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
                    abp.localization.defaultSourceName,
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
}