import { differenceInDays, parseISO } from "date-fns";

export const isWithinThreeDays = (isoDate: string) => {
  const date = parseISO(isoDate);
  return differenceInDays(new Date(), date) < 3;
};
