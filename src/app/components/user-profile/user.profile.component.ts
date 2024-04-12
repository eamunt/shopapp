import { OrderDetail } from '../../models/model.detail';
import { OrderService } from 'src/app/service/order.serivce';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { TokenService } from 'src/app/service/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
    selector: 'user-profile',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    // userProfileForm: FormGroup;
    userResponse?: UserResponse;
    birth_date_updated: any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private tokenSerive: TokenService,
    ) {
        // this.userProfileForm = this.formBuilder.group({
        //     fullname: [""],
        //     email: [''],
        //     phone_number: ["", Validators.minLength(6)],
        //     address: ['', [Validators.required, Validators.minLength(5)],
        //     note: ["careful"],
        //     shipping_method: ['express'],
        //     pay
        // })
    }
    ngOnInit(): void {
        const token = this.tokenSerive.getToken();
        if (token) {
            this.userService.getUserDetails(token).subscribe({
                next: (response: any) => {
                    debugger;
                    this.userResponse = {
                        ...response,
                    };

                    var todate = new Date(response.date_of_birth).getDate();
                    var tomonth = new Date(response.date_of_birth).getMonth() + 1;
                    var toyear = new Date(response.date_of_birth).getFullYear();

                    this.birth_date_updated = todate + '/' + tomonth + '/' + toyear;
                },
                complete: () => {
                    debugger;
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
        }
    }
}
