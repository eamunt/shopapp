import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/user/user.response';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { TokenService } from 'src/app/service/token.service';
import { HomeComponent } from '../home/home.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    userResponse?: UserResponse | null;
    isPopoverOpen = false;
    static isClicked: number = 0;
    static currentPage: any;

    togglePopover(event: Event): void {
        event.preventDefault();
        this.isPopoverOpen = !this.isPopoverOpen;
    }

    constructor(private userService: UserService, private tokenService: TokenService) {}
    handleItemClick(index: number): void {
        //alert(`Clicked on "${index}"`);
        // if (index === 2) {
        //     this.tokenService.logout();
        //     // this.userResponse = this.userService.getUserResponseFromLocalStorage();
        // }
        // this.isPopoverOpen = false; // Close the popover after clicking an item

        switch (index) {
            case 0:
                // Xử lý khi click vào "Tài khoản của tôi"
                break;
            case 1:
                // Xử lý khi click vào "Đơn mua"
                break;
            case 2:
                // Xử lý khi click vào "Đăng xuất"
                debugger;
                HeaderComponent.isClicked = 3;
                this.tokenService.logout();
                break;
            default:
                break;
        }
    }

    fill_bg(): void {
        let header = document.getElementById('navbarNav');
        let btns = header!.getElementsByClassName('nav-link');
        let current = document.getElementsByClassName('active');
        if (current.length !== 0) {
            current[0].className = current[0].className.replace(' active', '');
            debugger;
            btns[HeaderComponent.isClicked].className += ' active';
        }
    }
    ngOnInit() {
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        HeaderComponent.currentPage = window.location;
        if (HeaderComponent.currentPage.pathname === '/login') {
            let current = document.getElementsByClassName('active');
            if (current.length !== 0) {
                current[0].className = current[0].className.replace(' active', '');
                debugger;
                let e = document.getElementById('loginTag');
                if (e) {
                    e!.className += ' active';
                }
            }
        }
        if (HeaderComponent.currentPage.pathname === '/orders') {
            let current = document.getElementsByClassName('active');

            HeaderComponent.isClicked = 2;
            this.fill_bg();
        }
        debugger;
        if (this.userResponse) {
            debugger;
            this.fill_bg();
        }
    }
    activeClick(index: number): void {
        debugger;
        HeaderComponent.isClicked = index;
        this.fill_bg();
    }

    // ngAfterViewInit(): void {
    //     console.log('hello');
    //     // Add active class to the current button (highlight it)
    //     let header = document.getElementById('navbarNav');
    //     console.log(header);
    //     debugger;
    //     let btns = header!.getElementsByClassName('nav-link');
    //     console.log('btns', btns);
    //     for (let i = 0; i < btns.length; i++) {
    //         console.log(`btns`, btns[i]);
    //         btns[i].addEventListener('click', () => {
    //             this.isClicked = i;
    //             console.log('btns[i]', btns[i]);
    //             debugger;
    //             let current = document.getElementsByClassName('active');
    //             current[0].className = current[0].className.replace(' active', '');
    //             btns[this.isClicked].className += ' active';
    //         });
    //     }
    // }
}
