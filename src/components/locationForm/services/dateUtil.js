/**
 *
 * @param {string} date in dd/MM/yy format
 *
 * Temporary function to handle the date that comes from the server.
 * It will be replaced when the retrieved date will be in ISO format
 *
 */
export const stringToDate = date => {
  const regExp = /\d{2}\/\d{2}\/\d{2}/;

  return (
    date &&
    date.match(regExp) &&
    new Date(
      `20${date
        .split('/')
        .reverse()
        .join('-')}`
    )
  );
};

/**
 *
 * @param {date} date
 * Temporary function that converts a date object in the dd/MM/yy format as expected in the api
 */
export const dateToString = date => {
  return (
    date &&
    `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${String(date.getFullYear()).substring(2)}`
  );
};
