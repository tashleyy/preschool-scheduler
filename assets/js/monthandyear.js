// eslint-disable-next-line no-unused-vars
class MonthAndYear {
  constructor(year, month) {
    this.year = year;
    this.month = month;
  }

  incrementMonth() {
    this.month++;
    if (this.month === 12) {
      this.month = 0;
      this.year++;
    }
  }

  toString() {
    return `Year: ${this.year}, Month: ${this.month}`;
  }

  getMonth() {
    return this.month;
  }

  static getCopyOfSmallest(first, second) {
    if (MonthAndYear.lessThan(first, second)) {
      return new MonthAndYear(first.year, first.month);
    }
    return new MonthAndYear(second.year, second.month);
  }

  static getCopyOfLargest(first, second) {
    if (MonthAndYear.lessThan(first, second)) {
      return new MonthAndYear(second.year, second.month);
    }
    return new MonthAndYear(first.year, first.month);
  }

  static makeFromString(dateString) {
    const splitString = dateString.split('-');
    const year = parseInt(splitString[0], 10);
    const month = parseInt(splitString[1] - 1, 10);
    return new MonthAndYear(year, month);
  }

  static lessThan(first, second) {
    if (first.year !== second.year) {
      return first.year < second.year;
    }
    return first.month < second.month;
  }

  static equalTo(first, second) {
    return (first.year === second.year) && (first.month === second.month);
  }
}
