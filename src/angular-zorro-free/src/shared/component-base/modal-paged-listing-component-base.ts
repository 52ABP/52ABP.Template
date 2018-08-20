import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import {
  PagedResultDto,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';

export abstract class ModalPagedListingComponentBase<EntityDto>
  extends ModalComponentBase
  implements OnInit {
  /**
   * 数据表的数据源
   */
  dataList: EntityDto[] = [];

  //#region 分页模块

  /**
   * 分页大小
   */
  public pageSize = AppConsts.grid.defaultPageSize;

  /**
   * 当前页
   */ public pageNumber = 1;
  /**
   * 总页数
   */
  public totalPages = 1;
  /**
   * 总记录数
   */
  public totalItems: number;

  /**
   * 排序
   */
  public sorting: string = undefined;
  /**
   * 模糊搜索的文本
   */
  filterText = '';

  //#endregion

  //#region 数据加载模块
  /**
   * 是否加载中
   */
  public isTableLoading = false;
  //#endregion

  //#region Checkbox复选框

  /**
   * 是否全部选中
   */
  public allChecked = false;

  /**
   * 全选框是否禁用
   */
  public allCheckboxDisabled = false;
  /**
   * 选择框非全选状态，控制全选框的样式：☒
   */
  public checkboxIndeterminate = false;

  /**
   * 已选中数据项列表
   */
  public selectedDataItems: any[] = [];

  //#endregion

  /**
   * 构造函数
   * @param injector 注入器
   * @param nzModalRef (optional) nzModal 模态框关闭、销毁等处理帮助，只能在modal中打开的组件中注入，非modal打开的组件注入null即可，否则报错。因为nzModalRef是建立在nzModalComponent之上的。
   */
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * 子类中的ngOnInit会覆盖父类此方法
   */
  ngOnInit(): void {
    this.refresh();
  }
  /**
   * 刷新表格数据的方法
   */
  refresh(): void {
    this.restCheckStatus(this.dataList);
    this.getDataPage(this.pageNumber);
  }
  /**
   * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
   */
  refreshGoFirstPage(): void {
    this.pageNumber = 1;
    this.restCheckStatus(this.dataList);
    this.getDataPage(this.pageNumber);
  }

  //#region 分页的信息和内容

  //#endregion

  //#region 分页有关的实现基类方法

  /**
   * 计算分页
   * @param result 分页结果Dto
   *
   */
  public showPaging(result: PagedResultDto): void {
    this.totalItems = result.totalCount;
  }

  /**
   * 获取当前页数据
   * @param page 当前页码
   */
  public getDataPage(page: number): void {
    const req = new PagedRequestDto();
    req.maxResultCount = this.pageSize;
    req.skipCount = (page - 1) * this.pageSize;
    req.sorting = this.sorting;

    this.isTableLoading = true;
    this.getDataList(req, page, () => {
      this.isTableLoading = false;
      // 更新全选框禁用状态
      this.refreshAllCheckBoxDisabled();
    });
  }
  //#endregion

  //#region Checkbox，复选框的实现方法

  /**
   * 选中全部记录
   * @param value 是否选中
   */
  checkAll(value: boolean): void {
    this.dataList.forEach(data => ((<any>data).checked = this.allChecked));
    this.refreshCheckStatus(this.dataList);
  }
  /**
   * 刷新选中状态
   */
  refreshCheckStatus(entityList: any[]): void {
    // 是否全部选中
    const allChecked = entityList.every(value => value.checked === true);
    // 是否全部未选中
    const allUnChecked = entityList.every(value => !value.checked);
    // 是否全选
    this.allChecked = allChecked;
    // 全选框样式控制
    this.checkboxIndeterminate = !allChecked && !allUnChecked;
    // 已选中数据
    this.selectedDataItems = entityList.filter(value => value.checked);
  }

  /**
   * 重置选中状态
   */
  restCheckStatus(entityList: any[]): void {
    this.allChecked = false;
    this.checkboxIndeterminate = false;
    // 已选中数据
    this.selectedDataItems = [];
    // 设置数据为未选中状态
    entityList.forEach(value => (value.checked = false));
  }
  /**
   * 刷新全选框是否禁用
   */
  refreshAllCheckBoxDisabled(): void {
    this.allCheckboxDisabled = this.dataList.length <= 0;
  }

  //#endregion
  /**
   * 获取数据抽象接口，必须实现
   * @param request 请求必需参数 skipCount: number; maxResultCount: number;
   * @param pageNumber 当前页码
   * @param finishedCallback 完成后回调函数
   */
  protected abstract getDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void;
}
