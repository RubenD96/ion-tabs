import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ContactModalPage} from "../contact-modal/contact-modal";
import {Contacts} from "@ionic-native/contacts";
import {Calendar} from "@ionic-native/calendar";
import {EmailComposer} from "@ionic-native/email-composer";

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
    endDate: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                private toast: ToastController,
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

    sendToast(message: string) {
        this.toast.create({
            message: message,
            duration: 3000
        }).present();
    }

    addInvitation() {
        this.contacts.pickContact().then(contact => {
            if (contact.emails === null) {
                this.sendToast('Contact does not have an e-mail');
            } else if (this.containsInvitation(contact.emails[0].value)) {
                this.sendToast('Contact already invited');
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
        if (this.title !== undefined && this.startDate !== undefined && this.endDate !== undefined) {
            if (this.title.length > 0 && this.startDate.length > 0 && this.endDate.length > 0) {
                let partyObj = {
                    title: this.title,
                    description: this.description,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    location: this.location
                };

                this.calendar.createEvent(this.title, this.location, this.description, new Date(this.startDate), new Date(this.endDate));
                this.sendMail();

                this.callback(partyObj).then(() => {
                    this.navCtrl.pop();
                });
                return;
            }
        }

        this.sendToast('No Title or Date found');
    }

    sendMail() {
        let mail = {
            to: this.getInvitationMails(),
            subject: "Party invitation: " + this.title,
            body: this.description + "<br><br>Location: " + this.location + "<br>Time: " + this.startDate + " - " + this.endDate,
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
