import CommissionCalculator from '../services/commission-calculator';
import CashInCommission from '../services/cash-in-commission';

jest.mock('../services/cash-in-commission');

describe('CommissionCalculator', () => {
  it('should call CashInCommission', () => {
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

    new CommissionCalculator(inputData).calculate();
    expect(CashInCommission).toHaveBeenCalledTimes(1);
  });

  it('should call CashOutNaturalCommission', () => {
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

    new CommissionCalculator(inputData).calculate();
    expect(CashInCommission).toHaveBeenCalledTimes(1);
  });

  it('should call CashOutJuridicalCommission', () => {
    const inputData = {
      date: '2016-01-05',
      user_id: 1,
      user_type: 'juridical',
      type: 'cash_out',
      operation: {
        amount: 200.00,
        currency: 'EUR',
      },
    };

    new CommissionCalculator(inputData).calculate();
    expect(CashInCommission).toHaveBeenCalledTimes(1);
  });
});
