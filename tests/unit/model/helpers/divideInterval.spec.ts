import divideInterval from '@/model/helpers/divideInterval'

describe('divideInterval', () => {
  it('returns the amount of times the interval is contained between the given dates', () => {
    const result = divideInterval(
      new Date(1999, 1, 1),
      new Date(2001, 1, 1),
      { years: 1 }
    )
    expect(result).toEqual(2)
  })

  it('rounds down if there is a remainder', () => {
    const result = divideInterval(
      new Date(2000, 1, 1),
      new Date(2000, 11, 1),
      { months: 6 }
    )
    expect(result).toEqual(1)
  })

  it('can work with weeks', () => {
    const result = divideInterval(
      new Date(2000, 1, 1),
      new Date(2020, 1, 1),
      { weeks: 80 }
    )
    expect(result).toEqual(13)
  })

  it('takes into account if the year is leap', () => {
    const leapYearResult = divideInterval(
      new Date(2000, 1, 1),
      new Date(2000, 2, 1),
      { days: 29 }
    )
    expect(leapYearResult).toEqual(1)

    const commonYearResult = divideInterval(
      new Date(2001, 1, 1),
      new Date(2001, 2, 1),
      { days: 29 }
    )
    expect(commonYearResult).toEqual(0)
  })

  it('returns 0 if the given interval is bigger than interval between the given dates', () => {
    const result = divideInterval(
      new Date(2000, 1, 1),
      new Date(2000, 2, 1),
      { days: 35 }
    )
    expect(result).toEqual(0)
  })

  it('can\'t work if the interval is negative', () => {
    expect(() => {
      divideInterval(
        new Date(2000, 1, 1),
        new Date(2000, 2, 1),
        { years: -1 }
      )
    }).toThrow(Error)
  })

  it('can\'t work if the interval is empty', () => {
    expect(() => {
      divideInterval(
        new Date(2000, 1, 1),
        new Date(2000, 2, 1),
        { days: 0 }
      )
    }).toThrow(Error)
  })

  it('returns 0 if the end date is before the start date', () => {
    const result = divideInterval(
      new Date(2001, 1, 1),
      new Date(2000, 2, 1),
      { days: 1 }
    )
    expect(result).toEqual(0)
  })
})
