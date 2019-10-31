import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ClientInputType} from './types/ClientInputType';
import {ClientType} from './types/ClientType';
import * as Query from './global-query';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clients: ClientType[];
  public client: ClientType;
  public createdClient: ClientInputType;
  public updatedClient: ClientInputType;

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    /*apollo.create({
      link: httpLink.create({uri: 'http://127.0.0.1:8000'}),
      cache: new InMemoryCache()
    });*/
  }

  public getClients = () => {
    return this.apollo.query({
      query: Query.getClientsQl,
      fetchPolicy: "network-only"
    });
  };

  public getClient = (client: ClientType) => {
    return this.apollo.query({
      query: Query.getClientQl
    });
  };

  public createClient = (newClient: ClientInputType) => {
    return this.apollo.mutate({
        mutation: Query.createClientQl,
        variables: {client: newClient},
        /*update: (proxy, {data: {Client}}) => {
          const data: { clients: ClientType[] } = proxy.readQuery({query: Query.getClientsQl});
          const allClients = data['Clients'];
          console.log('data', data);
          console.log('client', Client);
          //allClients.push(Client);
          proxy.writeQuery({
            query: Query.getClientsQl, data
          });
        }*/
        /*refetchQueries: [
          { query: Query.getClientsQl}
        ]*/
      /*update: (store, { data: { client2 } }) => {
        const data: any = store.readQuery({query: Query.getClientsQl});
        let allLinks = data['Clients'];
        data['Clients'] = allLinks;
        console.log('client2',client2);
        store.writeQuery({
          query: Query.getClientsQl,
          data
        })
      },*/
      }
    );
  };

  public deleteClient = (id: Number) => {
    return this.apollo.mutate({
      mutation: Query.deleteClientQl,
      variables: {id: id}
      /*update: (cache, {data: {Clients}}) => {
        const allClients: any = cache.readQuery({query: Query.getClientsQl});
        console.log('allclients', allClients);
        console.log('clients', Clients);
        allClients['Clients'].push(Clients);
        //console.log('delete',allClients);
        cache.writeQuery({
          query: Query.getClientsQl,
          data: {
            'Clients': allClients['Clients']
          }
        });
      }*/
    });
  };

  public updateClient = (client: ClientInputType, id: Number) => {
    return this.apollo.mutate({
      mutation: Query.updateClientQl,
      variables: {client: client, id: id},
      /*update: (cache, {data}) => {
        let {allClients} = cache.readQuery({query: Query.updateClientQl});
        allClients.push(data);
        cache.writeQuery({
          query: Query.updateClientQl,
          data: {
            'Clients': allClients
          }
        });
      }*/
    })
  }

}
