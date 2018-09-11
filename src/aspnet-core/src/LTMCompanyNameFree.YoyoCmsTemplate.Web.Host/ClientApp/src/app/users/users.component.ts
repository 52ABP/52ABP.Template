import { Component, OnInit, Injector } from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';
import {
  PagedResultDtoOfUserDto,
  UserServiceProxy,
  UserDto,
} from '@shared/service-proxies/service-proxies';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {
  constructor(injector: Injector, private _userService: UserServiceProxy) {
    super(injector);
  }

  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this._userService
      .getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfUserDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }

  protected delete(entity: UserDto): void {
    abp.message.confirm(
      "Delete user '" + entity.fullName + "'?",
      (result: boolean) => {
        if (result) {
          this._userService.delete(entity.id).subscribe(() => {
            abp.notify.info('Deleted User: ' + entity.fullName);
            this.refresh();
          });
        }
      },
    );
  }

  create(): void {
    this.modalHelper
      .open(CreateUserComponent, {}, 'md', {
        nzMask: true,
        nzClosable: false,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  edit(item: UserDto): void {
    this.modalHelper
      .open(EditUserComponent, { id: item.id }, 'md', {
        nzMask: true,
        nzClosable: false,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}
