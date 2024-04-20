import { NgModule } from '@angular/core';

import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order/order.admin.component';
import { ProductAdminComponent } from './components/admin/product/product.admin.component';
import { CategoryAdminComponent } from './components/admin/category/category.admin.component';
import { DetailOrderAdminComponent } from './components/admin/detail-order/detail.order.admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        //admin
        AdminComponent,
        OrderAdminComponent,
        ProductAdminComponent,
        CategoryAdminComponent,
        DetailOrderAdminComponent,
    ],
    imports: [AdminRoutingModule, CommonModule],
})
export class AdminModule {}
