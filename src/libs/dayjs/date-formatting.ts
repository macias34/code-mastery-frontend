import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("en-gb");

export type date = string | number | dayjs.Dayjs | Date | null | undefined;

export const formatToMMMMDYYYY = (date: date) => {
  return dayjs(date).format("MMMM D, YYYY");
};

export const formatToDMMMMYYYY = (date: date) => {
  return dayjs(date).format("D MMMM, YYYY");
};

export const formatToDDMMYYYYHHmm = (date: date) => {
  return dayjs(date).format("DD.MM.YYYY, HH:mm");
};

export const formatToDDMMYYYY = (date: date) => {
  return dayjs(date).format("DD.MM.YYYY");
};

export const formatToDDMMTYYYYTHHmm = (date: date) => {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
};

export const formatToYYYYMMDD = (date: date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatToHHmm = (time: date) => {
  return dayjs(time, "HH:mm:ss").format("HH:mm");
};
