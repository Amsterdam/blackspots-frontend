/**
 *
 * @param {string} date in dd/MM/yy format
 *
 * Temporary function to handle the date that comes from the server.
 * It will be replaced when the retrieved date will be in ISO format
 *
 */
const getDate = date => {
  const regExp = /\d{2}\/\d{2}\/\d{2}/;

  return (
    date &&
    date.match(regExp) &&
    new Date(
      `20${date
        .split('/')
        .reverse()
        .join('-')}`
    ).toISOString()
  );
};

export default getDate;
