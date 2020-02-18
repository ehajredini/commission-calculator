import CashOutJuridicalCommission from '../services/cash-out-juridical-commission';
import Utils from '../utils/utils';

describe('CashOutJuridicalCommission', () => {
  const cashOutJuridicalConf = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };

  it('should calculate commission', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 1000.00,
        currency: 'EUR',
      },
    };

    const commission = new CashOutJuridicalCommission(inputData, cashOutJuridicalConf).calculate();
    expect(Utils.round(commission)).toEqual('3.00');
  });

  it('should calculate min commission', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 100,
        currency: 'EUR',
      },
    };

    const commission = new CashOutJuridicalCommission(inputData, cashOutJuridicalConf).calculate();
    expect(Utils.round(commission)).toEqual('0.50');
  });
});
