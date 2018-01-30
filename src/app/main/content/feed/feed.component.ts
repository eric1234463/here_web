import { Component, OnInit } from "@angular/core";
import { FeedService } from "../../../services/feed";
import { Feed } from "../../../services/constant";
import { Router } from "@angular/router";

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    public feeds: Feed[];
    constructor(public feedService: FeedService, public router: Router) {}

    async ngOnInit() {
        this.feeds = await this.feedService.getFeeds();
    }

    goToEdit(feed: Feed) {
        this.router.navigate(["/feed", feed.id]);
    }
    goToAdd() {
        this.router.navigateByUrl("/feed");
    }
}
