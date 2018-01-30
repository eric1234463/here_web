export interface Doctor {
    id: number;
    uid: String;
    photoURL?: String;
    displayName?: String;
    gender?: String;
    age?: number;
    about?: String;
    telphone?: String;
    location: String;
    google_lng: number;
    google_lat: number;
}

export interface FacebookUser {
    email: String;
    uid: String;
    token: String;
    image: String;
}

export interface GoogleUser {
    email: String;
    uid: String;
    name: String;
    image: String;
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
}

export interface Feed {
    id: number;
    doctorID: string;
    content: string;
    title: string;
    photoURL: string;
    createDt: Date;
    updateDt: Date;
}
