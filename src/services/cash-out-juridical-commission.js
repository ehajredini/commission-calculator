import Utils from '../utils/utils';

export default class CashOutJuridicalCommission {
  constructor(inputData, conf) {
    this.data = inputData;
    this.conf = conf;
  }

  calculate() {
    const commission = this.data.operation.amount * Utils.percentToDecimal(this.conf.percents);
    if (commission < this.conf.min.amount) {
      return this.conf.min.amount;
    }

    return commission;
  }
}
