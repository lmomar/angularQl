'use strict';
import gql from 'graphql-tag';
import {ClientInputType} from './types/ClientInputType';

export const createClientQl = gql`
    mutation client_new($client: ClientInput!){
        client_new(client: $client){
            id,
            fullName,
            email,
            login,
            created_at,
            deleted_at,
            deleted,
            enabled
        }
    }
`;

export const updateClientQl = gql`
    mutation  client_update($client: ClientInput!,$id: ID!){
        client_update(client: $client, id: $id){
            id,
            fullName,
            email,
            login,
            created_at,
            deleted_at,
            deleted,
            enabled
        }
    }
`;

export const getClientsQl = gql`
    query { Clients{
        id,
        fullName,
        email,
        login,
        enabled,
        deleted,
        created_at,
        deleted_at,
        orderCount
    }
    }
`;

export const getClientQl = gql`
    query { Client{
        id,
        fullName,
        email,
        login,
        enabled,
        deleted,
        created_at,
        deleted_at
    }
    }
`;

export const deleteClientQl = gql`
    mutation client_delete($id: Int!){
        client_delete(id: $id)
    }
`;

export const getOrdersQl = gql`
    query { Orders {
        id,
        client{id,fullName,login},
        price,
        created_at
    }
    }
`;
