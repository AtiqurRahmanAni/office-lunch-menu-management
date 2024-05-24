export const formatDate = (dateString) => {
  // Split the date string into components
  const [month, day, year] = dateString.split("/");

  // Create a new Date object
  const date = new Date(year, month - 1, day);

  // Get the components of the date
  const formattedYear = date.getFullYear();
  const formattedMonth = date.getMonth() + 1;
  const formattedDay = date.getDate();

  // Construct the formatted date string
  const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};
