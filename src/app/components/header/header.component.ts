import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/user/user.response';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    [x: string]: any;
    userResponse?: UserResponse | null;
    isPopoverOpen = false;
    static activeNavItem: number = 0;
    static currentPage: any;

    togglePopover(event: Event): void {
        event.preventDefault();
        this.isPopoverOpen = !this.isPopoverOpen;
    }

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private router: Router,
    ) {}
    handleItemClick(index: number): void {
        //alert(`Clicked on "${index}"`);
        // if (index === 2) {
        //     this.tokenService.logout();
        //     // this.userResponse = this.userService.getUserResponseFromLocalStorage();
        // }
        // this.isPopoverOpen = false; // Close the popover after clicking an item

        switch (index) {
            case 0:
                this.router.navigate(['/user-profile']);
                break;
            case 1:
                // Xử lý khi click vào "Đơn mua"
                break;
            case 2:
                // Xử lý khi click vào "Đăng xuất"
                debugger;
                this.tokenService.logout();
                break;
            default:
                break;
        }
    }

    ngOnInit() {
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        debugger;
        HeaderComponent.currentPage = window.location;

        // fill bg for trang chủ when login.
        if (this.userResponse && HeaderComponent.activeNavItem == -1) {
            HeaderComponent.activeNavItem = 0;
        }

        if (!this.userResponse) {
            if (HeaderComponent.currentPage.pathname === '/login') {
                HeaderComponent.activeNavItem = -1;
            }
        }
        if (this.userResponse) {
            if (HeaderComponent.currentPage.pathname === '/orders') {
                HeaderComponent.activeNavItem = 2;
            }
        }
    }
    activeClick(index: number): void {
        debugger;
        HeaderComponent.activeNavItem = index;
    }
    getActivateNavItem(): number {
        return HeaderComponent.activeNavItem;
    }
}
