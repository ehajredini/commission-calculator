import CommissionCalculator from '../services/commission-calculator';
import CashInCommission from '../services/cash-in-commission';
import CashOutNaturalCommission from '../services/cash-out-natural-commission';
import CashOutJuridicalCommission from '../services/cash-out-juridical-commission';

jest.mock('../services/cash-in-commission');
jest.mock('../services/cash-out-natural-commission');
jest.mock('../services/cash-out-juridical-commission');

describe('CommissionCalculator', () => {
  const cashInConf = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
  const cashOutNaturalConf = { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } };
  const cashOutJuridicalConf = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };

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

    new CommissionCalculator(
      inputData,
      { cashInConf, cashOutNaturalConf, cashOutJuridicalConf },
    ).calculate();
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

    new CommissionCalculator(
      inputData,
      { cashInConf, cashOutNaturalConf, cashOutJuridicalConf },
    ).calculate();
    expect(CashOutNaturalCommission).toHaveBeenCalledTimes(1);
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

    new CommissionCalculator(
      inputData,
      { cashInConf, cashOutNaturalConf, cashOutJuridicalConf },
    ).calculate();
    expect(CashOutJuridicalCommission).toHaveBeenCalledTimes(1);
  });
});
