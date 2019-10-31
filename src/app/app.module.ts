import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {Apollo, APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ClientsComponent } from './clients/clients.component';
import { NavbarComponent } from './navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule} from '@angular/forms';
import {InMemoryCache} from "apollo-cache-inmemory";



const routes: Routes = [
  { path: 'clients', component: ClientsComponent, pathMatch: 'full'},
  { path: 'orders', component: OrdersComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    ClientsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink){
    apollo.create({
      link: httpLink.create({uri: 'http://127.0.0.1:8000'}),
      cache: new InMemoryCache()
    })
  }
}
