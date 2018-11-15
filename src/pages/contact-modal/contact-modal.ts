import {Component} from '@angular/core';
import {NavParams, ToastController, ViewController} from 'ionic-angular';

@Component({
    selector: 'page-contact-modal',
    templateUrl: 'contact-modal.html'
})
export class ContactModalPage {

    contactName: string = '';
    mail: string = '';
    buttonText: string = 'Add Contact';

    constructor(public viewCtrl: ViewController, public navParams: NavParams, private toast: ToastController) {
        let navName = navParams.get('name');
        let navMail = navParams.get('mail');
        if (navName !== undefined && navMail !== undefined) {
            this.contactName = navParams.get('name');
            this.mail = navParams.get('mail');
            this.buttonText = 'Edit Contact';
        }
    }

    addContact() {
        this.viewCtrl.dismiss({
            name: this.contactName,
            mail: this.mail
        });
    }
}
