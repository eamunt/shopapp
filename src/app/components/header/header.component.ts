import { Component } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private tokenService: TokenService) {}

    ngOnInit(): void {}

    logout(): void {
        this.tokenService.logout();
    }
}
