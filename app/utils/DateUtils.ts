export const convertStringToDate = (date: string): Date => {
  const parts = date.split("/");

  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]) + 1);
};

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("/");
  const formattedDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );
  const formattedDay = String(formattedDate.getDate()).padStart(2, "0");
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const formattedYear = formattedDate.getFullYear();
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};
