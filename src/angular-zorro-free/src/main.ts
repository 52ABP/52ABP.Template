import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';
import { RootModule } from 'root.module';



if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  return platformBrowserDynamic()
    .bootstrapModule(RootModule, {
      defaultEncapsulation: ViewEncapsulation.Emulated,
      preserveWhitespaces: false,
    }).then((res) => {
      if ((<any>window).appBootstrap) {
        (<any>window).appBootstrap();
      }
      return res;
    });
};

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}