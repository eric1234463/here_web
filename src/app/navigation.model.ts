export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                id: "operation",
                title: "Operation",
                type: "group",
                permission: ["doctor"],
                children: [
                    {
                        id: "QR",
                        title: "QR",
                        type: "item",
                        icon: "apps",
                        url: "/qr"
                    },
                    {
                        id: "Home",
                        title: "Home",
                        type: "item",
                        icon: "home",
                        url: "/home"
                    },
                    {
                        id: "Feeds",
                        title: "Feeds",
                        type: "item",
                        icon: "rss_feed",
                        url: "/feeds"
                    },
                    {
                        id: "Patient Appointment",
                        title: "Patient Appointment",
                        type: "item",
                        icon: "bookmark",
                        url: "/booking"
                    }
                ]
            }
        ];
    }
}
