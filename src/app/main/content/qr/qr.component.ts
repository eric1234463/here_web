import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

interface Doctor {
    name: string;
    location: string;
    visited: boolean;
}

@Component({
    selector   : 'fuse-sample',
    templateUrl: './qr.component.html',
    styleUrls  : ['./qr.component.scss']
})

export class FuseSampleComponent
{
    public doctorDoc: AngularFirestoreDocument<Doctor>;
    public doctor: Observable<Doctor>;
    public currentDoctor: Doctor;
    public loadingIndicator = true;
    constructor(private translationLoader: FuseTranslationLoaderService, public afs: AngularFirestore, public afAuth: AngularFireAuth)
    {
        this.afAuth.authState.subscribe(user => {
            this.doctorDoc = this.afs.doc('doctor/' + user.uid);
            this.doctor = this.doctorDoc.valueChanges();
            this.doctor.subscribe(doctor => {
                this.currentDoctor = doctor;
                console.log(doctor);
                this.loadingIndicator = false;
            });
        });
        this.translationLoader.loadTranslations(english, turkish);

    }
}
