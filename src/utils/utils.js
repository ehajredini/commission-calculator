export default class Utils {
  static round(number) {
    return (Math.ceil(number * 100) / 100).toFixed(2);
  }

  static percentToDecimal(percent) {
    return percent / 100;
  }
}
