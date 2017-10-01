import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {MainPage} from '../pages/main/main'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBUP7So6l5Zrn0V-MkLJgRhVJADp5_st1I",
  authDomain: "ej02-b5ae5.firebaseapp.com",
  databaseURL: "https://ej02-b5ae5.firebaseio.com",
  projectId: "ej02-b5ae5",
  storageBucket: "ej02-b5ae5.appspot.com",
  messagingSenderId: "761565118884"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    AngularFireDatabase
  ]
})
export class AppModule {}
