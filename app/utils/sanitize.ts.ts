export const sanitizeKey = (key:string) => {
  return key.replace(/\s+/g, '-').toLowerCase();
};