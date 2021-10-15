import AbstactView from './AbstractView.js';

export default class extends AbstactView {
  constructor(params) {
    super(params);
    this.setTitle('The Weather App');
  }

  async getHtml() {
    return `
        <h2>cities</h2>
        `;
  }
}
