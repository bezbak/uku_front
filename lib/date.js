import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const dateFormatFrom = 'YYYY-MM-DD';
const dateFormatTo = 'DD.MM.YY';

export const getFormattedDate = (dateStr, format = dateFormatTo) => {
  return dayjs(dateStr).format(format)
}

export const formatDate = (dayJs, format = dateFormatTo) => {
  return dayJs.format(format)
}

export const parseDate = (date, format = dateFormatFrom) => {
  return dayjs(date, format)
}

export const isDateString = (dateStr, format = dateFormatFrom) => {
  return dayjs(dateStr, format).isValid()
}

export const toDateISOString = (dateStr, format = dateFormatFrom) => {
  return dayjs(dateStr, format).toISOString()
}

export const convertDateToEn = (dateStr) => {
  return formatDate(parseDate(dateStr));
}