import moment from 'moment';
import CommissionType from '../constants/commission-type';
import UserType from '../constants/user-type';
import Currencies from '../constants/currencies';
import CashInCommission from './cash-in-commission';
import CashOutNaturalCommission from './cash-out-natural-commission';
import CashOutJuridicalCommission from './cash-out-juridical-commisssion';
import RoundNumberUtil from '../utils/round-number-util';

export default class CommissionCalculator {
  constructor(inputData) {
    this.data = inputData;
    this.validateData();
  }

  calculate() {
    if (this.data.type === CommissionType.CASH_IN) {
      const commission = new CashInCommission(this.data).calculate();
      return RoundNumberUtil.round(commission);
    }

    if (this.data.type === CommissionType.CASH_OUT
      && this.data.user_type === UserType.NATURAL) {
      const commission = new CashOutNaturalCommission(this.data).calculate();
      return RoundNumberUtil.round(commission);
    }

    if (this.data.type === CommissionType.CASH_OUT
      && this.data.user_type === UserType.JURIDICAL) {
      const commission = new CashOutJuridicalCommission(this.data).calculate();
      return RoundNumberUtil.round(commission);
    }

    return null;
  }

  validateData() {
    if (!(this.validateDate()
      && this.validateUserId()
      && this.validateUserType()
      && this.validateCommissionType()
      && this.validateOperation())) {
      throw new Error('Invalid input data');
    }
  }

  validateDate() {
    return moment(this.data.date, 'YYYY-MM-DD', true).isValid();
  }

  validateUserId() {
    return Number.isInteger(this.data.user_id);
  }


  validateUserType() {
    return this.data.user_type === UserType.JURIDICAL || this.data.user_type === UserType.NATURAL;
  }

  validateCommissionType() {
    return this.data.type === CommissionType.CASH_OUT || this.data.type === CommissionType.CASH_IN;
  }

  validateOperation() {
    return this.data.operation.amount > 0 && this.data.operation.currency === Currencies.EUR;
  }
}
