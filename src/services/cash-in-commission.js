import Utils from '../utils/utils';

export default class CashInCommission {
  constructor(inputData, conf) {
    this.data = inputData;
    this.conf = conf;
  }

  calculate() {
    const commission = this.data.operation.amount * Utils.percentToDecimal(this.conf.percents);
    if (commission > this.conf.max.amount) {
      return this.conf.max.amount;
    }

    return commission;
  }
}
