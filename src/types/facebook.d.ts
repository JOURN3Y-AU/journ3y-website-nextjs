declare global {
  interface Window {
    fbq?: (
      action: 'track' | 'trackCustom' | 'init',
      eventName: string,
      data?: Record<string, any>
    ) => void;
    _fbq?: any;
    gtag?: (command: string, action: string, params?: object) => void;
  }
}

export {};
