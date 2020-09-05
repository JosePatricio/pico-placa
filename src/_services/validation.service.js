import { RulesDataConstants } from "../_constants";
import moment from "moment";

function isValidTime(time_) {
  const format = "hh:mm:ss";
  const time = moment(new Date(time_).toLocaleTimeString("en-GB"), format);
  const fromTimeAM = moment(
    RulesDataConstants.picoPlacaTimeRules.AM.from,
    format
  );
  const toTimeAM = moment(RulesDataConstants.picoPlacaTimeRules.AM.to, format);
  const fromTimePM = moment(
    RulesDataConstants.picoPlacaTimeRules.PM.from,
    format
  );
  const toTimePM = moment(RulesDataConstants.picoPlacaTimeRules.PM.to, format);
  return (
    time.isBetween(fromTimeAM, toTimeAM) || time.isBetween(fromTimePM, toTimePM)
  );
}

function validate(plate, date_, time_) {

  const date = new Date(date_);
  const lastDigit = Number(plate.slice(-1));
  const time = new Date(time_);

  let resultDay = false,
    resultTime = false;

  resultTime = !isValidTime(time);

  switch (date.getDay()) {
    case RulesDataConstants.weekDays.Monday:
      resultDay = RulesDataConstants.picoPlacaDayRules.Monday.includes(
        lastDigit
      );
      break;

    case RulesDataConstants.weekDays.Tuesday:
      resultDay = RulesDataConstants.picoPlacaDayRules.Tuesday.includes(
        lastDigit
      );
      break;
    case RulesDataConstants.weekDays.Wednesday:
      resultDay = RulesDataConstants.picoPlacaDayRules.Wednesday.includes(
        lastDigit
      );
      break;
    case RulesDataConstants.weekDays.Thursday:
      resultDay = RulesDataConstants.picoPlacaDayRules.Thursday.includes(
        lastDigit
      );
      break;
    case RulesDataConstants.weekDays.Friday:
      resultDay = RulesDataConstants.picoPlacaDayRules.Friday.includes(
        lastDigit
      );
      break;

    default:
      break;
  }

  return { resultDay, resultTime };
}

export const validationService = {
  validate,
};
