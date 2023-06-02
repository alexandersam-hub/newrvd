export const getConnectString = (): string => {
  return process.env.DATABASE_CONNECT_STRING as string;
};
