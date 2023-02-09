const checkForDigit = month => {
  if (month.length == 1) {
    return (month = '0' + month[0]);
  }
  return month;
};

const getDates = (month, year) => {
  let dateFirst = null;
  let dateLast = null;
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    dateFirst = new Date(`${year}-${checkForDigit(month)}-01T00:00:00Z`);
    dateLast = new Date(`${year}-${checkForDigit(month)}-31T23:59:59Z`);
  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
    dateFirst = new Date(`${year}-${checkForDigit(month)}-01T00:00:00Z`);
    dateLast = new Date(`${year}-${checkForDigit(month)}-30T23:59:59Z`);
  } else {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      dateFirst = new Date(`${year}-${checkForDigit(month)}-01T00:00:00Z`);
      dateLast = new Date(`${year}-${checkForDigit(month)}-29T23:59:59Z`);
    } else {
      dateFirst = new Date(`${year}-${checkForDigit(month)}-01T00:00:00Z`);
      dateLast = new Date(`${year}-${checkForDigit(month)}-28T23:59:59Z`);
    }
  }
  return { dateFirst, dateLast };
};

module.exports = getDates;
