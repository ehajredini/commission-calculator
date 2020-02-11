import CashInCommission from '../services/cash-in-commission';
import RoundNumberUtil from '../utils/round-number-util';

describe('CashInCommission', () => {
  it('should calculate commission', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 200.00,
        currency: 'EUR',
      },
    };

    const commission = new CashInCommission(inputData).calculate();
    expect(RoundNumberUtil.round(commission)).toEqual('0.06');
  });

  it('should calculate max commission', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: {
        amount: 10000000.00,
        currency: 'EUR',
      },
    };

    const commission = new CashInCommission(inputData).calculate();
    expect(RoundNumberUtil.round(commission)).toEqual('5.00');
  });
});
