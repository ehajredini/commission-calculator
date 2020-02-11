import * as fs from 'fs';
import CommissionCalculator from './commission-calculator';

export default class CalculateCommissionForInputData {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
  }

  run() {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const inputRawData = fs.readFileSync(this.dataFilePath);
        const inputData = JSON.parse(inputRawData);
        inputData.forEach((data) => {
          const commission = new CommissionCalculator(data).calculate();
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
