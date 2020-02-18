import moment from 'moment';
import Utils from '../utils/utils';

const consumedWeekLimit = [];

export default class CashOutNaturalCommission {
  constructor(inputData, conf) {
    // Make Monday start of the week
    moment.updateLocale('en', { week: { dow: 1 } });

    this.data = inputData;
    this.conf = conf;
  }

  calculate() {
    const key = `${this.data.user_id}_${moment(this.data.date).week()}_${moment(this.data.date).year()}`;
    const consumedLimitItem = consumedWeekLimit.find((consumed) => consumed.key === key);

    if (consumedLimitItem) {
      consumedLimitItem.amount += this.data.operation.amount;
      if (consumedLimitItem.amount <= this.conf.week_limit.amount) {
        return 0;
      }
      return this.data.operation.amount * Utils.percentToDecimal(this.conf.percents);
    }

    consumedWeekLimit.push({
      key,
      amount: this.data.operation.amount,
    });

    if (this.data.operation.amount <= this.conf.week_limit.amount) {
      return 0;
    }

    return (this.data.operation.amount - this.conf.week_limit.amount)
      * Utils.percentToDecimal(this.conf.percents);
  }
}
