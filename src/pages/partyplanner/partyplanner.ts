import {Component} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {ContactModalPage} from "../contact-modal/contact-modal";
import {Contacts} from "@ionic-native/contacts";
import {Calendar} from "@ionic-native/calendar";
import {EmailComposer} from "@ionic-native/email-composer";
import {ToastHelper} from "../../model/helpers/ToastHelper";

@Component({
    selector: 'page-partyplanner',
    templateUrl: 'partyplanner.html'
})
export class PartyplannerPage {

    invitations: any = [];
    callback: any;
    title: string = '';
    description: string;
    location: string = '';
    startDate: string;
    duration: number;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                private toast: ToastHelper,
                private contacts: Contacts,
                private calendar: Calendar,
                private mailComposer: EmailComposer) {
        this.callback = this.navParams.get("callback");
    }

    containsInvitation(mail: string) {
        for (let invitation of this.invitations) {
            if (invitation.mail === mail) {
                return true;
            }
        }
        return false;
    }

    addInvitation() {
        this.contacts.pickContact().then(contact => {
            if (contact.emails === null) {
                this.toast.createToast('Contact does not have an e-mail');
            } else if (this.containsInvitation(contact.emails[0].value)) {
                this.toast.createToast('Contact already invited');
            } else {
                this.invitations.push({
                    name: contact.displayName,
                    mail: contact.emails[0].value
                });
            }
        });
    }

    editInvitation(contact) {
        let contactModal = this.modalCtrl.create(ContactModalPage, contact);

        contactModal.onDidDismiss(edits => {
            contact.name = edits.name;
            contact.mail = edits.mail;
        });

        contactModal.present();
    }

    deleteInvitation(contact) {
        let index = this.invitations.indexOf(contact);

        if (index > -1) {
            this.invitations.splice(index, 1);
        }
    }

    sendInvitations() {
        if (this.title !== undefined && this.startDate !== undefined && this.duration !== undefined) {
            if (this.title.length > 0 && this.startDate.length > 0 && this.duration > 0) {
                let start = new Date(this.startDate);
                let end = new Date(start.getTime() + (this.duration * 60 * 60 * 1000));

                let partyObj = {
                    title: this.title,
                    description: this.description,
                    startDate: this.startDate,
                    endDate: end,
                    location: this.location
                };

                this.calendar.createEvent(this.title, this.location, this.description, start, end);
                this.sendMail(end);

                this.callback(partyObj).then(() => {
                    this.navCtrl.pop();
                });
                return;
            }
        }

        this.toast.createToast('No Title or Date found');
    }

    sendMail(end: Date) {
        let mail = {
            to: this.getInvitationMails(),
            subject: "Party invitation: " + this.title,
            body: this.description + "<br><br>Location: " + this.location + "<br>Time: " + this.startDate + " - " + end,
            isHtml: true
        };

        this.mailComposer.open(mail);
    }

    getInvitationMails() {
        let mails = [];
        for (let invitation of this.invitations) {
            mails.push(invitation.mail);
        }
        return mails;
    }
}
