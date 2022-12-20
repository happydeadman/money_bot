export const generateRandomString = (): string =>
  Math.random().toString(36).substring(2, 15);
