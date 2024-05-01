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

export const convertDateToString = (date: Date) => {
  if (date === null) {
    return "";
  }
  let formattedDay: string = date.getDate().toString();
  let formattedMonth: string = (date.getMonth() + 1).toString();
  const formattedYear: string = date.getFullYear().toString();

  formattedMonth =
    Number(formattedMonth) < 10
      ? `0${formattedMonth}`
      : formattedMonth.toString();
  formattedDay = Number(formattedDay) < 10 ? `0${formattedDay}` : formattedDay;

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};
