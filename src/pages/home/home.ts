import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PartyplannerPage} from "../partyplanner/partyplanner";
import {Calendar} from "@ionic-native/calendar";
import {EmailComposer} from "@ionic-native/email-composer";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private calendar: Calendar, private mailComposer: EmailComposer) {
    }

    parties: any = [];

    ionViewDidLoad() {
        this.calendar.hasWritePermission().then(bool => {
            if (!bool) {
                this.calendar.requestWritePermission();
            }
        });

        this.mailComposer.hasPermission().then(bool => {
            if (!bool) {
                this.mailComposer.requestPermission();
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
