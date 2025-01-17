import { combineReducers } from '@reduxjs/toolkit';

// add your slices here.
import loginSlice from './LoginSlice';
import CustomersSlice from './CustomersSlice';
import DeliveryNoteSlice from './DeliveryNoteSlice';
import BillOfMaterialsSlice from './BillOfMaterialsSlice';
import WarehouseSlice from './WarehouseSlice';
import CompanySlice from './CompanySlice';
import DriversSlice from './DriversSlice';

import ItemSlice from './ItemSlice';
import SuppliersSlice from './SuppliersSlice';
import SalesOrderSlice from './SalesOrderSlice';
import SalesInvoiceSlice from "./SalesInvoiceSlice";
import PurchaseOrderSlice from './PurchaseOrderSlice';
import PurchaseReceiptSlice from './PurchaseReceiptSlice';
import usersSlice from './usersSlice';
import DeliveryTripSlice from './DeliveryTripSlice';
import VehicleSlice from './VehicleSlice';
import ActivityLogSlice from './ActivityLogSlice';
import WorkStationSlice from './WorkStationSlice';
import WorkStationTypeSlice from './WorkStationTypeSlice';
import WorkOrderSlice from './WorkOrderSlice';
import WorkReceiptSlice from './WorkReceiptSlice';
import RoutingSlice from './RoutingSlice';
import DashboardSlice from './DashboardSlice'
import OperationSlice from './OperationSlice';
const rootReducer = combineReducers({
  login: loginSlice,
  users: usersSlice,
  dashboard: DashboardSlice,
  customers: CustomersSlice,
  deliveryNote: DeliveryNoteSlice,
  deliveryTrip: DeliveryTripSlice,
  billOfMaterials: BillOfMaterialsSlice,
  operation: OperationSlice,
  workStations: WorkStationSlice,
  workStationType: WorkStationTypeSlice,
  workOrder: WorkOrderSlice,
  routing: RoutingSlice,
  workReceipt: WorkReceiptSlice,
  warehouse: WarehouseSlice,
  company: CompanySlice,
  items: ItemSlice,
  suppliers: SuppliersSlice,
  salesOrder: SalesOrderSlice,
  salesInvoice: SalesInvoiceSlice,
  drivers: DriversSlice,
  purchaseOrder: PurchaseOrderSlice,
  purchaseReceipt: PurchaseReceiptSlice,
  vehicles: VehicleSlice,
  activityLogs: ActivityLogSlice,
});

export default rootReducer;
