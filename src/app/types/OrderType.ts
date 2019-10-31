import {ClientType} from "./ClientType";

export type OrderType = {
  'id': number;
  'price': string;
  'client': ClientType;
  'created_at': string;
}
