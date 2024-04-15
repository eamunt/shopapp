import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailComponent } from './components/order-confirm/order.detail.component';
import { NgModule } from '@angular/core';
import { AuthGuardFn } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit.user.profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardFn } from './guards/admin.guard';
import { OrderAdminComponent } from './components/admin/order/order.admin.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },

    { path: 'admin', component: AdminComponent, canActivate: [AdminGuardFn] },
    { path: 'admin/orders', component: OrderAdminComponent, canActivate: [AdminGuardFn] },

    { path: 'register', component: RegisterComponent },
    { path: 'products/:id', component: DetailProductComponent },
    { path: 'orders', component: OrderComponent, canActivate: [AuthGuardFn] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardFn] },
    { path: 'user-profile/edit', component: EditUserProfileComponent, canActivate: [AuthGuardFn] },
    { path: 'orders/:id', component: OrderDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
