import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { OrderComponent } from '../order/order.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { OrderDetailComponent } from '../order-confirm/order.detail.component';
import { NgModule } from '@angular/core';
import { AuthGuardFn } from '../../guards/auth.guard';
import { UserProfileComponent } from '../user-profile/user.profile.component';
import { EditUserProfileComponent } from '../edit-user-profile/edit.user.profile.component';
import { AdminComponent } from './admin.component';
import { AdminGuardFn } from '../../guards/admin.guard';
import { OrderAdminComponent } from './order/order.admin.component';
import { ProductAdminComponent } from './product/product.admin.component';
import { CategoryAdminComponent } from './category/category.admin.component';
import { DetailOrderAdminComponent } from './detail-order/detail.order.admin.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'orders',
                component: OrderAdminComponent,
            },
            {
                path: 'orders/:id',
                component: DetailOrderAdminComponent,
            },
            {
                path: 'products',
                component: ProductAdminComponent,
            },
            {
                path: 'categories',
                component: CategoryAdminComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
