import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import {ClientInputType} from '../types/ClientInputType';
import {ClientType} from '../types/ClientType';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


import {tap} from "rxjs/operators";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clients: ClientType[];
  public client: ClientType;
  public createdClient:ClientInputType = {};
  public updatedClient: ClientInputType = {};
  modalOptions: NgbModalOptions;
  closeResult: string;
  modalRef: NgbModalRef;
  currentClientId: Number;

  constructor(private service: ClientService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackDrop'
    }
  }

  ngOnInit() {
     this.getClients();
  }

  getClients(){
    this.service.getClients().subscribe(result => {
      this.clients = result.data['Clients'] as ClientType[]
    });
  }

  addClient(formData){
    this.service.createClient(this.createdClient).subscribe(result => {
      //console.log(result);
      this.client = result.data['client_new'] as ClientType;
      //console.log(this.client);
      this.modalRef.close();
      this.getClients();
    })
    ;
  }

  deleteClient(id){
    this.service.deleteClient(id).subscribe(result => {
      console.log(result.data);
      this.getClients();
    })
  }

  updateClient(){
    this.service.updateClient(
      { email: this.updatedClient.email,login: this.updatedClient.login,
        fullName: this.updatedClient.fullName,enabled: this.updatedClient.enabled,deleted: this.updatedClient.deleted}, this.currentClientId).subscribe(result => {
      console.log(result.data);
      this.modalRef.close();
      this.getClients();
    })
  }

  open(content,client=null){
    this.modalRef = this.modalService.open(content,this.modalOptions);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
    );
    if(client){
      this.currentClientId = client.id;
      this.updatedClient = client;
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
