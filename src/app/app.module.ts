import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {PartyplannerPage} from "../pages/partyplanner/partyplanner";
import {ContactModalPage} from "../pages/contact-modal/contact-modal";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Contacts} from "@ionic-native/contacts";
import {Calendar} from "@ionic-native/calendar";
import {EmailComposer} from "@ionic-native/email-composer";
import {ToastHelper} from "../model/helpers/ToastHelper";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        PartyplannerPage,
        ContactModalPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        PartyplannerPage,
        ContactModalPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Contacts,
        Calendar,
        EmailComposer,
        ToastHelper,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
