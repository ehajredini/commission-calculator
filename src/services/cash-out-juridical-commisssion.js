export default class CashOutJuridicalCommission {
  constructor(inputData) {
    this.commissionFee = 0.003;
    this.minAmount = 0.5;
    this.data = inputData;
  }

  calculate() {
    const commission = this.data.operation.amount * this.commissionFee;
    if (commission < this.minAmount) {
      return this.minAmount;
    }

    return commission;
  }
}
