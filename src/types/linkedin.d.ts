
declare global {
  interface Window {
    lintrk?: (action: string, data?: any) => void;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

export {};
