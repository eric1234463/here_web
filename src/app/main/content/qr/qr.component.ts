import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { HttpClient } from '@angular/common/http';

export interface Patient {
    id: number;
    hkid: String;
    gender: String;
    uid: String;
    photoURL?: String;
    displayName?: String;
    weight: number;
    height: number;
    bmi: number;
}

export interface Doctor {
    displayName: string;
    photoURL: string;
    location: string;
    records: Record[];
    visited: Boolean;
}

export interface Record {
    id: String;
    visitDate: Date;
    startDate: Date;
    endDate: Date;
    factor: any[];
    medicine: any[];
    rate: number;
    title: string;
    description: string;
    Doctor: Doctor;
    Patient: Patient;
}



@Component({
    selector: 'fuse-sample',
    templateUrl: './qr.component.html',
    styleUrls: ['./qr.component.scss']
})

export class FuseSampleComponent {
    public doctorDoc: AngularFirestoreDocument<Doctor>;
    public uid: String;
    public connection: Boolean = false;
    public currentDoctor: Doctor;
    public loadingIndicator = true;
    public records: Record[];

    constructor(private translationLoader: FuseTranslationLoaderService,
        public afs: AngularFirestore, public afAuth: AngularFireAuth, public socket: Socket, public http: HttpClient) {
        this.afAuth.authState.subscribe(user => {
            this.uid = user.uid;
            this.socket.connect();
            this.socket.emit('subscribe', user.uid);
            this.translationLoader.loadTranslations(english, turkish);
            new Promise((resolve, reject) => {
                this.socket.on('cancel doctor', function (data) {
                    resolve();
                });
            }).then(() => {
                this.connection = false;
            });
            new Promise((resolve, reject) => {
                this.socket.on('connect doctor', function (data) {
                    const patient: String = data.patient;
                    resolve(patient);
                });
            }).then(patient => {
                this.http.get<Record[]>(`https://herefyp.herokuapp.com/api/record?userId=${patient}`).subscribe(records => {
                    this.connection = true;
                    this.records = records;
                    this.loadingIndicator = false;
                });
            });
        });

    }

}
