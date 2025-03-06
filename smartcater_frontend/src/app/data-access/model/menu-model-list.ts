import { ICustomer } from '../interface/i-customer';
import { IDelivery } from '../interface/i-delivery';
import { IMenuModel } from '../interface/i-menumodel';
export const deliveryDefaultValue: IDelivery = {
  house: null,
  town: null,
  city: null,
  pinCode: null,
};
export const customerDefaultValue: ICustomer = {
  name: null,
  whatsapp: null,
  email: null,
};

export const defaultOrderValue: IMenuModel = {
  customerId : null,
  id: null,
  city: null,
  occasion: null,
  eventDate: null,
  deliveryTime: null,
  guestCount: null,
  boxtype: null,
  starterList: [],
  starterSaladList: [],
  mainsList: [],
  breadsList: [],
  breadRiceList: [],
  dallist: [],
  breadlist: [],
  ricelist: [],
  dessertList: [],
  liveserviceList: [],
  customer: customerDefaultValue,
  totalPrice: null,
  delivery: deliveryDefaultValue,
  viewPackege: false,
  status: 'PENDING',
};
