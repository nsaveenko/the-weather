import AbstactView from './AbstractView.js';

export default class extends AbstactView {
  constructor(params) {
    super(params);
    this.setTitle('The Weather App');
  }

  async getHtml() {
    return `
    <section>
        <h1>weather app</h1>
        <div class="wrapper">
            <div class="content-container">
                <div class="search">
                    <input type="text" class="search-bar" placeholder="Search City">
                    <button class="search-button">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
                            </path>
                        </svg>
                    </button>
                    <div class="search-result"></div>
                </div>
                <div class="edit">
                    <button class="edit-button">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zM16.045 4.401l1.587 1.585-1.59 1.584-1.586-1.585L16.045 4.401zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zM4 20H20V22H4z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="wrapper">
            <div class="cities-cards"></div>
        </div>
    </section>
    `;
  }
}
