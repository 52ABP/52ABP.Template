
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { AuditLogServiceProxy, AuditLogListDtoPagedResultDto, AuditLogListDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';


@Component({
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.less'],
  animations: [appModuleAnimation()],
})


export class AuditlogComponent extends PagedListingComponentBase<AuditLogListDto>
  implements OnInit {

  constructor(
    injector: Injector,
    private _auditlogService: AuditLogServiceProxy,
    private route: ActivatedRoute

  ) {
    super(injector);
  }


  input: any;
  creationTimeRang = new Array();

  username: string;
  serviceName: string;
  methodName: string;
  browserInfo: string;
  hasException: boolean;
  minExecutionDuration: number;
  maxExecutionDuration: number;
  parameters: string;

  isFirstload = true;

  /**
  * 获取后端数据列表信息
  * @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
  * @param pageNumber 当前页码
  * @param finishedCallback 完成后回调函数
  */
  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

    if (this.isFirstload) {
      this.route.paramMap.subscribe(params => {
        this.serviceName = params.get("service") || "";
        //this.methodName = params.get("method");
        this.parameters = params.get("parameters") || "";
      });
      this.isFirstload = false;
    }

    this._auditlogService.getAuditLogs(
      this.creationTimeRang.length == 2 ? moment(this.creationTimeRang[0]) : undefined,
      this.creationTimeRang.length == 2 ? moment(this.creationTimeRang[1]) : undefined,
      this.username, this.serviceName, this.methodName, this.browserInfo, this.hasException,
      this.minExecutionDuration || undefined, this.maxExecutionDuration || undefined,
      this.parameters,
      request.sorting,
      request.maxResultCount,
      request.skipCount,
    )
      .finally(() => {
        finishedCallback();
      })
      .subscribe(result => {
        this.dataList = result.items;
        this.showPaging(result);
      });
  }

  showDetail(msg: string): void {
    abp.message.info(msg);
  }

}

