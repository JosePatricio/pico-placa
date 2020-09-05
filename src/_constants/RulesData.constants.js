const weekDays = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0,
};

const picoPlacaDayRules = {
  Monday: [1, 2],
  Tuesday: [3, 4],
  Wednesday: [5, 6],
  Thursday: [7, 8],
  Friday: [9, 0],
};

const picoPlacaTimeRules = {
  AM: { from: "7:00:00", to: "9:30:00" },
  PM: { from: "16:00:00", to: "19:30:00" },
};

export const RulesDataConstants = {
  weekDays,
  picoPlacaDayRules,
  picoPlacaTimeRules,
};
