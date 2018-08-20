import { HeaderLanguageswitch } from './default/header/components/languageswitch.component';
import { NgModule } from '@angular/core';

import { HeaderComponent } from '@app/layout/default/header/header.component';
import { SidebarComponent } from '@app/layout/default/sidebar/sidebar.component';
import { HeaderSearchComponent } from '@app/layout/default/header/components/search.component';
import { HeaderNotifyComponent } from '@app/layout/default/header/components/notify.component';
import { HeaderTaskComponent } from '@app/layout/default/header/components/task.component';
import { HeaderIconComponent } from '@app/layout/default/header/components/icon.component';
import { HeaderFullScreenComponent } from '@app/layout/default/header/components/fullscreen.component';
import { HeaderStorageComponent } from '@app/layout/default/header/components/storage.component';
import { HeaderUserComponent } from '@app/layout/default/header/components/user.component';

const COMPONENTS = [
  HeaderComponent,
  SidebarComponent,
  SideBarLogoComponent,
  SidebarUserComponent,
];

const HEADERCOMPONENTS = [
  HeaderSearchComponent,
  HeaderNotifyComponent,
  HeaderTaskComponent,
  HeaderIconComponent,
  HeaderFullScreenComponent,
  HeaderStorageComponent,
  HeaderUserComponent,
  HeaderLanguageswitch,
];

//
import { SharedModule } from '@shared/shared.module';
import { SideBarLogoComponent } from '@app/layout/default/sidebar/components/sidebar-logo.component';
import { SidebarUserComponent } from '@app/layout/default/sidebar/components/sidebar-user.component';

@NgModule({
  imports: [SharedModule],
  providers: [],
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule { }
