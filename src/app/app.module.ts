import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER} from 'ngx-ui-loader';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {TokenInterceptorInterceptor} from './service/token-interceptor.interceptor';
import {AuthService} from './service/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberTableComponent } from './member-table/member-table.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
   text:"Loading...",
  textColor:"#ffffff",
  textPosition:"center-center",
  bgsColor:"#43c26e",
  fgsColor:"#43c26e",
  fgsType:SPINNER.fadingCircle,
  fgsSize:100,
  hasProgressBar:true,


}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    ConfirmationComponent,
    MembersListComponent,
    MemberAddComponent,
    MemberEditComponent,
    MemberTableComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [AuthService,{provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
