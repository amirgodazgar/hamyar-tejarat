export const dateToPersian = (gregorianDate) =>
  new Date(gregorianDate).toLocaleDateString("fa-IR");
