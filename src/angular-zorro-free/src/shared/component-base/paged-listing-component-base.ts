import { AppComponentBase } from '@shared/app-component-base';
import { Injector, OnInit } from '@angular/core';

export class PagedResultDto {
  items: any[];
  totalCount: number;
}

export class EntityDto {
  id: number;
}

export class PagedRequestDto {
  skipCount: number;
  maxResultCount: number;
}

export abstract class PagedListingComponentBase<EntityDto>
  extends AppComponentBase
  implements OnInit {
  public pageSize = 10;
  public pageNumber = 1;
  public totalPages = 1;
  public totalItems: number;
  public isTableLoading = true;

  dataList: EntityDto[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.getDataPage(this.pageNumber);
  }

  public getDataPage(page: number): void {
    if (page === 0) {
      page = 1;
    }
    const req = new PagedRequestDto();
    req.maxResultCount = this.pageSize;
    req.skipCount = (page - 1) * this.pageSize;

    this.isTableLoading = true;
    this.fetchData(req, page, () => {
      this.isTableLoading = false;
    });
  }

  public showPaging(result: PagedResultDto): void {
    this.totalItems = result.totalCount;
  }

  protected abstract fetchData(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void;
  protected abstract delete(entity: EntityDto): void;
}
