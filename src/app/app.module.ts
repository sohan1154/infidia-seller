import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { GlobalProvider } from "../providers/globals/globals";
import { ApisService } from "../providers/apis/apis";
import { TabsComponent } from './components/tabs/tabs.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
  ],
  entryComponents: [
  ],
  imports: [
    IonicStorageModule.forRoot({
      name: '__infidia-seller',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalProvider,
    ApisService,
    Camera,
    File,
    WebView,
    FilePath,
    SocialSharing,
    AppRate
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
