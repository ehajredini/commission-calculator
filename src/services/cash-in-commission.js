export default class CashInCommission {
  constructor(inputData) {
    this.commissionFee = 0.0003;
    this.maxAmount = 5;
    this.data = inputData;
  }

  calculate() {
    const commission = this.data.operation.amount * this.commissionFee;
    if (commission > this.maxAmount) {
      return this.maxAmount;
    }

    return commission;
  }
}
