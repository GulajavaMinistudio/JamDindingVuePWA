import moment from 'moment';

export default class {
  static async parseDataTanggal() {
    moment.locale('id');

    const promiseTanggal = new Promise((resolve) => {
      const momentlocale = moment().locale('id');
      const stringTanggalBaku = momentlocale.format('DD MMMM YYYY');
      resolve(stringTanggalBaku);
    });

    const results = await promiseTanggal;
    return results;
  }
}
