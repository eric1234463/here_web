import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
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
    constructor(private translationLoader: FuseTranslationLoaderService, public afs: AngularFirestore)
    {
        this.translationLoader.loadTranslations(english, turkish);
        this.doctorDoc = this.afs.doc('doctor/9JdJxNPiVaRypMcgnPY6');
        this.doctor = this.doctorDoc.valueChanges();
        this.doctor.subscribe(doctor => {
            console.log(doctor);
        });
    }
}
