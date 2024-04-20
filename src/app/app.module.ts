import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderDetailComponent } from './components/order-confirm/order.detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit.user.profile.component';
import { AdminModule } from './admin.module';
@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        OrderComponent,
        DetailProductComponent,
        OrderDetailComponent,
        LoginComponent,
        RegisterComponent,
        AppComponent,
        UserProfileComponent,
        EditUserProfileComponent,
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        AdminModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [
        AppComponent,
        // HomeComponent,
        // OrderComponent,
        // OrderDetailComponent,
        // LoginComponent,
        // RegisterComponent,
        // DetailProductComponent,
    ],
})
export class AppModule {}
