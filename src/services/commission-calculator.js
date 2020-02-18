import moment from 'moment';
import CommissionType from '../constants/commission-type';
import UserType from '../constants/user-type';
import Currencies from '../constants/currencies';
import CashInCommission from './cash-in-commission';
import CashOutNaturalCommission from './cash-out-natural-commission';
import CashOutJuridicalCommission from './cash-out-juridical-commission';
import Utils from '../utils/utils';

export default class CommissionCalculator {
  constructor(inputData, { cashInConf, cashOutNaturalConf, cashOutJuridicalConf }) {
    this.data = inputData;
    this.cashInConf = cashInConf;
    this.cashOutNaturalConf = cashOutNaturalConf;
    this.cashOutJuridicalConf = cashOutJuridicalConf;
    this.validateData();
  }

  calculate() {
    if (this.data.type === CommissionType.CASH_IN) {
      const commission = new CashInCommission(this.data, this.cashInConf).calculate();
      return Utils.round(commission);
    }

    if (this.data.type === CommissionType.CASH_OUT
      && this.data.user_type === UserType.NATURAL) {
      const commission = new CashOutNaturalCommission(
        this.data, this.cashOutNaturalConf,
      ).calculate();
      return Utils.round(commission);
    }

    if (this.data.type === CommissionType.CASH_OUT
      && this.data.user_type === UserType.JURIDICAL) {
      const commission = new CashOutJuridicalCommission(
        this.data, this.cashOutJuridicalConf,
      ).calculate();
      return Utils.round(commission);
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
