export default class RoundNumberUtil {
  static round(number) {
    return (Math.ceil(number * 100) / 100).toFixed(2);
  }
}
