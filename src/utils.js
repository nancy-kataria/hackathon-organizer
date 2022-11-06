import moment from "moment";

export function getStatus(startTime, endTime) {
  const now = new Date();
  if (moment(startTime).isAfter(now)) return "Upcoming";

  if (moment(startTime).isBefore(now) && moment(endTime).isAfter(now))
    return "Active";

  return "Past";
}
