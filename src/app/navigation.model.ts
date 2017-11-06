export class NavigationModel {
	public model: any[];

	constructor() {
		this.model = [
			{
				'id': 'applications',
				'title': 'Applications',
				'type': 'group',
				'children': [
					{
						'id': 'QR',
						'title': 'QR',
						'type': 'item',
						'icon': 'email',
						'url': '/sample',
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
