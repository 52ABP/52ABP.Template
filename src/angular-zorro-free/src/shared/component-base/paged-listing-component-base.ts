import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { Injector, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { NzModalRef } from 'ng-zorro-antd';
/**
 * 分页请求必须参数
 */
export class PagedResultDto {
  items: any[];
  totalCount: number;
}

// 实体主键dto
export class EntityDto {
  id: number;
}
/**
 * 分页结果dto
 */
export class PagedRequestDto {
  skipCount: number;
  maxResultCount: number;
  sorting: string;
}

/**
 * 分页列表基类，包含一些分页通用方法。注意 派生类中的 `ngOnInit` 会覆盖此类中的此方法。
 */
// tslint:disable-next-line:no-shadowed-variable
export abstract class PagedListingComponentBase<EntityDto>
  extends AppComponentBase
  implements OnInit {
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
   * 是否加载中
   */
  public isTableLoading = true;

  public isActive: boolean | undefined;
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
  /**
   * 排序
   */
  public sorting: string = undefined;

  /**
   * 模糊搜索的文本
   */
  filterText = '';

  /**
   * 数据表的数据源
   */
  dataList: EntityDto[] = [];

  /**
   * 构造函数
   * @param injector 注入器
   * @param nzModalRef (optional) nzModal 模态框关闭、销毁等处理帮助，只能在modal中打开的组件中注入，非modal打开的组件注入null即可，否则报错。因为nzModalRef是建立在nzModalComponent之上的。
   */
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.refresh();
  }

  /**
   * 刷新表格数据
   * @param args
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

  /**
   *
   *
   *
   *
   * 布尔类型表格列头过滤列表
   */
  // tslint:disable-next-line:member-ordering
  public booleanFilterList: any[] = [
    { text: this.l('All'), value: 'All' },
    { text: this.l('Yes'), value: true },
    { text: this.l('No'), value: false },
  ];
  public getDataPage(page: number): void {
    // if (page <= 0) {
    //   this.pageNumber = 1;
    //   this.refresh();
    //   return;
    // }
    const req = new PagedRequestDto();
    req.maxResultCount = this.pageSize;
    req.skipCount = (page - 1) * this.pageSize;
    req.sorting = this.sorting;
    this.isTableLoading = true;
    this.fetchDataList(req, page, () => {
      this.isTableLoading = false;
      // 更新全选框禁用状态
      this.refreshAllCheckBoxDisabled();
    });
  }
  /**
   * 刷新全选框是否禁用
   */
  refreshAllCheckBoxDisabled(): void {
    this.allCheckboxDisabled = this.dataList.length <= 0;
  }
  public pageNumberChange(): void {
    if (this.pageNumber > 0) {
      this.refresh();
    }
  }

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
   * 计算分页
   * @param result 分页结果Dto
   * @param pageNumber 当前页码
   */
  public showPaging(result: PagedResultDto): void {
    this.totalItems = result.totalCount;
  }

  /**
   * 数据表格排序
   * @param sort 排序信息
   */
  gridSort(sort: { key: string; value: string }) {
    this.sorting = undefined;
    let ascOrDesc = sort.value; // 'ascend' or 'descend' or null
    const filedName = sort.key; // 字段名
    if (ascOrDesc) {
      ascOrDesc = abp.utils.replaceAll(ascOrDesc, 'end', '');
      const args = ['{0} {1}', filedName, ascOrDesc];
      const sortingStr = abp.utils.formatString.apply(this, args);
      this.sorting = sortingStr;
    }
    this.refresh();
  }

  /**
   * 权限列表验证
   * @param permissions 权限名称列表
   */
  isGrantedAny(...permissions: string[]): boolean {
    if (!permissions) {
      return false;
    }
    for (const permission of permissions) {
      if (this.isGranted(permission)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 获取数据抽象接口，必须实现
   * @param request 请求必需参数 skipCount: number; maxResultCount: number;
   * @param pageNumber 当前页码
   * @param finishedCallback 完成后回调函数
   */
  protected abstract fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void;
}
