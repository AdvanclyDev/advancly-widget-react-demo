export enum RESPONSE_STATUSES {
  SUCCESS = "success",
  CANCEL = "cancel",
}

export enum ENVIRONMENT {
  TEST = "test",
  STAGING = "staging",
  PRODUCTION = "production",
}

export interface IResponse {
  status: RESPONSE_STATUSES;
  data: {
    message?: string;
    loan_amount?: string;
    loan_application_referenceno?: string;
    loan_interest?: string;
    loan_product?: string;
    loan_tenure?: string;
  };
}

export interface AdvanclyProps {
  aggregator_id: number; // The ID of the aggregator / business giving out the loan
  bank_account_number: string | number; // The borrower's bank account number
  bank_code: string | number; // The borrower's bank code on Advancly
  borrower_phone: string; // The borrower's phone number
  bvn_number: string; // The borrower's BVN number
  aggregator_loan_ref?: string; // The loan reference number on your platform Not required
  cac_number?: string; // For corporate borrowers, provide the CAC number
  city: string; // City of the borrower
  company_name?: string; // For corporate borrowers, provide the company name
  customer_type: "1" | "2"; // 1 for individual, 2 for corporate
  email: string; // The borrower's email address
  first_name: string; // The borrower's first name
  gender: string; // The borrower's gender
  last_name: string; // The borrower's last name
  photo_url?: string; // The photo url of the borrower
  public_key: string; // Your public key. Sign up on https://aggregator.advancly.com to get yours.
  residence_address: string; // The borrower's address
  state: string; // The state of the borrower
  product_id: number; // The product ID of the loan. This can be gotten on the aggregator's platform
  product_code: string; // The product code of the loan. This can be gotten on the aggregator's platform
  tenure: number; // The loan tenure in days
  customStyles?: {
    buttonBackgroundColor?: string; // Can be string or the color code
    buttonTextColor?: string; // Can be string or the color code
    acceptButtonBackgroundColor?: string; // Can be string or the color code
    acceptButtonTextColor?: string; // Can be string or the color code
    declineButtonBackgroundColor?: string; // Can be string or the color code
    declineButtonTextColor?: string; // Can be string or the color code
    dropdownTextColor?: string; // Can be string or the color code
    dropdownBackgroundColor?: string; // Can be string or the color code
  };
  onCancel: (response: IResponse) => void; // Handle the cancel event from the widget
  onSuccess: (response: IResponse) => void; // Handle the success event from the widget
  autoStart?: boolean; // Defaults to false. If set to true, the widget will automatically start
  showWidget: boolean; // Defaults to false. If set to true, the widget will come up
  environment: ENVIRONMENT; // Defaults to test. Can be set to "staging" or "production"
}
