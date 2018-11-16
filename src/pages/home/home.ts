import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PartyplannerPage} from "../partyplanner/partyplanner";
import {Calendar} from "@ionic-native/calendar";
import {EmailComposer} from "@ionic-native/email-composer";
import {ToastHelper} from "../../model/helpers/ToastHelper";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                private calendar: Calendar,
                private mailComposer: EmailComposer,
                private toast: ToastHelper) {
    }

    parties: any = [];

    ionViewDidLoad() {
        this.calendar.hasWritePermission().then(permission => {
            if (!permission) {
                this.calendar.requestWritePermission().catch(err => {
                    this.toast.error();
                    console.log(err);
                });
            }
        });

        this.mailComposer.hasPermission().then(permission => {
            if (!permission) {
                this.mailComposer.requestPermission().catch(err => {
                    this.toast.error();
                    console.log(err);
                });
            }
        });
    }

    myCallbackFunction = (_params) => {
        return new Promise((resolve, reject) => {
            this.parties.push(_params);
            resolve();
        });
    };

    openPartyPlanner(): void {
        this.navCtrl.push(PartyplannerPage, {
                callback: this.myCallbackFunction
            }
        )
    }
}
