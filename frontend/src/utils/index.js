export const formatDate = (dateString) => {
  console.log(dateString);
  const [month, day, year] = dateString.split("/");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
