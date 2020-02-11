import CashOutNaturalCommission from '../services/cash-out-natural-commission';
import RoundNumberUtil from '../utils/round-number-util';

describe('CashOutNaturalCommission', () => {
  it('should be free of charge under 1000', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: {
        amount: 200.00,
        currency: 'EUR',
      },
    };

    const commission = new CashOutNaturalCommission(inputData).calculate();
    expect(RoundNumberUtil.round(commission)).toEqual('0.00');
  });

  it('should calculate commission for exceed amount', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: {
        amount: 1000,
        currency: 'EUR',
      },
    };

    const commission = new CashOutNaturalCommission(inputData).calculate();
    expect(RoundNumberUtil.round(commission)).toEqual('3.00');
  });
});
