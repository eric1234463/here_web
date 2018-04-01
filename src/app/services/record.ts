import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Factor, Medicine } from "./constant";

@Injectable()
export class RecordService {
    constructor(public http: HttpClient) {}

    async getMedicines() {
        return await this.http
            .get<Medicine[]>(`https://herefyp.herokuapp.com/api/medicine`)
            .toPromise();
    }

    async getFactors() {
        return await this.http
            .get<Factor[]>(`https://herefyp.herokuapp.com/api/factor`)
            .toPromise();
    }

    async createRecord(payload) {
        return await this.http
            .post("https://herefyp.herokuapp.com/api/record", payload)
            .toPromise();
    }
}
