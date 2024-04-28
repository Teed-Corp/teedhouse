export const convertStringToDate = (date: string): Date => {
  const parts = date.split("/");

  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]) + 1);
};
