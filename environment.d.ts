import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site
      POLARZERO_API_KEY: string;
      GOOGLE_SHEETS_ID_RUNNING: string;
      GOOGLE_SHEETS_API_KEY_RUNNING: string;
      // Config
      NEXT_PUBLIC_POLARZERO_ADDRESS: Address;
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_KEY: string;
      // Services
      NEXT_PUBLIC_ALCHEMY_ID: string;
      // Sendgrid
      SENDGRID_API_KEY: string;
    }
  }
}

export {};
