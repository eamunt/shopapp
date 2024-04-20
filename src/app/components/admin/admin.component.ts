import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    adminComponent: string = 'orders';
    userReponse?: UserResponse | null;

    static activeNavItem: number = 0;
    static currentPage: any;

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private userSerice: UserService,
    ) {}
    ngOnInit(): void {
        this.userReponse = this.userSerice.getUserResponseFromLocalStorage();
        this.router.navigate(['admin/orders']);
    }

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
    showAdminComponent(componentName: string, index: number) {
        this.adminComponent = componentName;
        AdminComponent.activeNavItem = index;
        switch (index) {
            case 0:
                this.router.navigate(['admin/orders']);
                break;
            case 1:
                this.router.navigate(['admin/categories']);
                break;
            case 2:
                this.router.navigate(['admin/products']);
                break;
            default:
                break;
        }
    }

    getActivateNavItem(): number {
        return AdminComponent.activeNavItem;
    }
}
