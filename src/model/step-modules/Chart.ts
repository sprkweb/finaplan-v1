import { addYears, startOfDay } from 'date-fns'

export type ChartOptions = { startDate: Date, endDate: Date}

const curDate = startOfDay(new Date())
export const defaultOptions: ChartOptions = {
  startDate: curDate,
  endDate: addYears(curDate, 6)
}
