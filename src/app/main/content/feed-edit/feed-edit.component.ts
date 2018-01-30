import { Component, OnInit } from "@angular/core";
import { FeedService } from "../../../services/feed";
import { Feed } from "../../../services/constant";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import filestack from "filestack-js";

@Component({
    selector: "app-feed-edit",
    templateUrl: "./feed-edit.component.html",
    styleUrls: ["./feed-edit.component.scss"]
})
export class FeedEditComponent implements OnInit {
    public feed: Feed;
    public form: FormGroup;
    public edit = false;
    constructor(
        public feedService: FeedService,
        public route: ActivatedRoute,
        public router: Router,
        public formBuilder: FormBuilder
    ) {}

    async ngOnInit() {
        this.form = this.formBuilder.group({
            content: ["", Validators.compose([Validators.required])],
            title: ["", Validators.compose([Validators.required])],
            photoURL: ["", Validators.compose([Validators.required])]
        });
        this.route.params.subscribe(params => {
            if (params) {
                this.feedService.getFeedById(params["id"]).then(feed => {
                    this.feed = feed;
                    this.edit = true;
                    this.form.setValue({
                        content: feed.content,
                        title: feed.title,
                        photoURL: feed.photoURL
                    });
                });
            }
        });
    }

    upload() {
        const apikey = "AauW5nIJWQqWKha5AHVUTz";
        const client = filestack.init(apikey);
        client
            .pick({
                maxFiles: 1,
                fromSources: ["local_file_system"],
                uploadInBackground: false,
                accept: ["image/*"]
            })
            .then(res => {
                console.log(res);
                this.form.patchValue({
                    photoURL: res.filesUploaded[0].url
                });
            });
    }
    async update() {
        if (this.edit) {
            const feed = await this.feedService.updateFeed(
                this.feed.id,
                this.form.value
            );
            this.router.navigateByUrl("feeds");
        } else {
            const feed = await this.feedService.createFeed(this.form.value);
            this.router.navigateByUrl("feeds");
        }
    }
}
