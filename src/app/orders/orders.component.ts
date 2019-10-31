import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {OrderType} from "../types/OrderType";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: OrderType[];
  constructor(private service: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.service.getOrders().subscribe(data => {
      this.orders = data.data['Orders'] as OrderType[];
    })
  }

}
