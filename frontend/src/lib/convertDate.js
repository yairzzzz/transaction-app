const convertDate = (date) => {
  const newDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-CA").format(newDate);

  return formattedDate;
};

export default convertDate;
