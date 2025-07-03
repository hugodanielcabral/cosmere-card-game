export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      TOKEN_SECRET: string;
      NODE_ENV: 'test' | 'dev' | 'prod';
    }
  }
}
