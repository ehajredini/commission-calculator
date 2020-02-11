import moment from 'moment';

const consumedWeekLimit = [];

export default class CashOutNaturalCommission {
  constructor(inputData) {
    // Make Monday start of the week
    moment.updateLocale('en', { week: { dow: 1 } });

    this.commissionFee = 0.003;
    this.weekLimitAmount = 1000;
    this.data = inputData;
  }

  calculate() {
    const key = `${this.data.user_id}_${moment(this.data.date).week()}_${moment(this.data.date).year()}`;
    const consumedLimitItem = consumedWeekLimit.find((consumed) => consumed.key === key);

    if (consumedLimitItem) {
      consumedLimitItem.amount += this.data.operation.amount;
      if (consumedLimitItem.amount <= this.weekLimitAmount) {
        return 0;
      }
      return this.data.operation.amount * this.commissionFee;
    }

    consumedWeekLimit.push({
      key,
      amount: this.data.operation.amount,
    });

    if (this.data.operation.amount <= this.weekLimitAmount) {
      return 0;
    }
    return (this.data.operation.amount - this.weekLimitAmount) * this.commissionFee;
  }
}
