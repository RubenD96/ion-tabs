import {ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class ToastHelper {

    constructor(private toast: ToastController) {

    }

    createToast(message: string, duration: number = 3000) {
        this.toast.create({
            message: message,
            duration: duration
        }).present();
    }

    error() {
        this.createToast("Something went wrong", 5000);
    }
}