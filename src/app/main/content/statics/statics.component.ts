import { Component, OnInit } from "@angular/core";
import { Doctor } from "../../../services/constant";
import { UserService } from "../../../services/user";

@Component({
    selector: "app-statics",
    templateUrl: "./statics.component.html",
    styleUrls: ["./statics.component.scss"]
})
export class StaticsComponent implements OnInit {
    public view: any[] = [700, 400];
    showXAxis = true;
    showYAxis = true;
    public pie = [
        {
            name: "Men",
            value: 100
        },
        {
            name: "Women",
            value: 200
        },
        {
            name: "Children",
            value: 300
        }
    ];

    public patient = [
        {
            name: "1-4-2017",
            value: 2
        },
        {
            name: "2-4-2017",
            value: 4
        },
        {
            name: "3-4-2017",
            value: 9
        }
    ];
    public user: Doctor;

    constructor( public userService : UserService) {

    }

    async ngOnInit() {
        this.user = await this.userService.getUser();
    }
}
