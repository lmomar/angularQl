import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import * as Query from './global-query';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    //console.log('creating apollo instance');
    /*apollo.create({
      link: httpLink.create({uri: 'http://127.0.0.1:8000'}),
      cache: new InMemoryCache()
    });*/
  }

  public getOrders = () =>{
    return this.apollo.query({
      query: Query.getOrdersQl,
      fetchPolicy: "network-only"
    })
  }
}
