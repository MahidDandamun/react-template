export interface PrimayContactDetails {
  email_id: string;
  mobile_number: string;
}

export interface AddressDetails {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface CustomerInput {
  customer_name: string;
  customer_group: string;
  territory: string;
  customer_type: string;
  primary_details?: PrimayContactDetails;
  primary_address_details?: AddressDetails;
}
