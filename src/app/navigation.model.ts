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
                        icon: "email",
                        url: "/qr"
                        // 'badge': {
                        // 	'title': 25,
                        // 	'bg': '#F44336',
                        // 	'fg': '#FFFFFF'
                        // }
                    },
                    {
                        id: "Home",
                        title: "Home",
                        type: "item",
                        icon: "home",
                        url: "/home"
                        // 'badge': {
                        // 	'title': 25,
                        // 	'bg': '#F44336',
                        // 	'fg': '#FFFFFF'
                        // }
                    }
                ]
            }
        ];
    }
}
