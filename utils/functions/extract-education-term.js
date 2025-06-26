/**
 *
 * @param {object} data
 * @param {string} data.id
 * @param {string} data.term
 * @param {string} data.startDate
 * @param {string} data.endDate
 * @param {string} data.lastRegistrationDate
 *
 * @returns {Array<{value: string, label: string}> | []
 *
 */

import moment from "moment";

export const extractEducationTerm = (data) => {
  if (!data || data?.status === "error") return [];

  // Sort the data by startDate using moment comparison:
  const sortedData = data.sort((a, b) =>
    moment(a.startDate).diff(moment(b.startDate))
  );

  return sortedData.map((item) => {
    // take only the first part of the term and take the first char, then lowercase the remaining letters:
    const formattedTerm =
      item.term.split("_")[0].charAt(0) +
      item.term.split("_")[0].slice(1).toLowerCase();

    return {
      value: item.id,
      label: `${formattedTerm} - ${moment(item.startDate).format("LL")}`,
    };
  });
};
