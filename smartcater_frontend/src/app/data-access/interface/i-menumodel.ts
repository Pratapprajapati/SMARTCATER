import { ICustomer } from './i-customer';
import { IDelivery } from './i-delivery';
import { IMenu } from './i-menu';

export interface IMenuModel {
  customerId ?: string;
  id?: string;
  city?: string;
  occasion?: string;
  eventDate?: Date;
  deliveryTime?: string;
  guestCount?: number;
  boxtype?: string;
  starterList?: Array<IMenu>;
  starterSaladList?: Array<IMenu>;
  mainsList?: Array<IMenu>;
  breadsList?: Array<IMenu>;
  dallist?: Array<IMenu>;
  breadlist?: Array<IMenu>;
  breadRiceList?: Array<IMenu>;
  ricelist?: Array<IMenu>;
  dessertList?: Array<IMenu>;
  liveserviceList?: Array<IMenu>;
  customer?: ICustomer;
  totalPrice?: number;
  delivery?: IDelivery;
  viewPackege?: boolean;
  status?: string;
}
