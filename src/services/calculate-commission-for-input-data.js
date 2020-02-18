import * as fs from 'fs';
import CommissionCalculator from './commission-calculator';
import Configurations from './configurations';

export default class CalculateCommissionForInputData {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
  }

  async run() {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const inputRawData = fs.readFileSync(this.dataFilePath);
        const inputData = JSON.parse(inputRawData);
        const configurations = new Configurations();
        await configurations.fetchConfigurations();
        const { cashInConf, cashOutNaturalConf, cashOutJuridicalConf } = configurations;
        inputData.forEach((data) => {
          const commission = new CommissionCalculator(
            data, { cashInConf, cashOutNaturalConf, cashOutJuridicalConf },
          ).calculate();
          console.log(commission);
        });
      } else {
        throw new Error('Input data file does not exists!');
      }
    } catch (err) {
      console.error(err);
    }
  }
}
