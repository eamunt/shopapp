import { OrderDetail } from '../../models/model.detail';
import { OrderService } from 'src/app/service/order.serivce';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
