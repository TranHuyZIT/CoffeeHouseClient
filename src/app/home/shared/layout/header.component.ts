import { Component } from '@angular/core';

@Component({
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    selector: 'home-header',
})
export class HomeHeaderComponent {
    address = 'B3-10 Đường số 3';
    userImage =
        'https://www.ukri.org/wp-content/uploads/2022/02/STFC-240222-SpaceGalaxyStars-GettyImages-1035676256.jpg';
    name = 'Tran Huy';
    cartLength = 0;
}
