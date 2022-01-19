declare type SimpleDuration =
  { years: number } |
  { months: number } |
  { weeks: number } |
  { days: number }

/**
 * Amount of money in an abstract currency
 */
 type Cash = number;

 type Percent = number;

 /**
  * Here I create an alias to underscore that Duration
  * can also mean a date
  * relative to the initial date of the calculations.
  *
  * e.g. 3 months and 2 days after the start of the plan
  */
 type RelativeDate = Duration;
