import axios from 'axios';
import AppUrls from '../constants/app-urls';

export default class Configurations {
  async fetchConfigurations() {
    await this.fetchCashInConfig();
    await this.fetchCashOutNaturalConfig();
    await this.fetchCashOutJuridicalConfig();
  }

  async fetchCashInConfig() {
    try {
      const cashInConfigRes = await axios.get(AppUrls.CASH_IN_CONFIG);
      this.cashInConf = cashInConfigRes.data;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchCashOutNaturalConfig() {
    try {
      const cashInConfigRes = await axios.get(AppUrls.CASH_OUT_NATURAL_CONFIG);
      this.cashOutNaturalConf = cashInConfigRes.data;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchCashOutJuridicalConfig() {
    try {
      const cashInConfigRes = await axios.get(AppUrls.CASH_OUT_JURIDICAL_CONFIG);
      this.cashOutJuridicalConf = cashInConfigRes.data;
    } catch (err) {
      console.log(err);
    }
  }
}
