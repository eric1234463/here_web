import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user";
import { Booking } from "../../../services/constant";
import { Router } from "@angular/router";

@Component({
    selector: "app-booking",
    templateUrl: "./booking.component.html",
    styleUrls: ["./booking.component.scss"]
})
export class BookingComponent implements OnInit {
    public bookings: Booking[];
    constructor(public userService: UserService, public router: Router) {}

    async ngOnInit() {
        this.bookings = await this.userService.getBookings();
    }

    async operate(booking, accept) {
        const status = await this.userService.acceptBooking(booking.id, accept);
        this.bookings = await this.userService.getBookings();
    }
}
