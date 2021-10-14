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
                        <div class="search">
                            <input type="text" class="search-bar" placeholder="Search City">
                            <button class="search-button">
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    stroke-width="0" 
                                    viewBox="0 0 1024 1024" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="card-content">
                    <div class="wrapper">
                        <div class="card">
                            <div class="weather">
                                <h2 class="city"></h2>
                                <div class="temp"></div>
                                <div class="weather-descripton"></div>
                                <div class="weather-characteristics">
                                    <div class="wind">
                                        <i>
                                            <svg 
                                                stroke="currentColor" 
                                                fill="currentColor" 
                                                stroke-width="0" 
                                                viewBox="0 0 24 24" 
                                                height="1em" 
                                                width="1em" 
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1C10.327 4 11 4.673 11 5.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zM15.5 15H8v2h7.5c.827 0 1.5.673 1.5 1.5S16.327 20 15.5 20c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z"></path><path d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4S20.206 5 18 5zM2 15H6V17H2z"></path>
                                            </svg>
                                        </i>
                                        <span class="wind-value"></span>
                                    </div>
                                    <div class="humidity">
                                        <i>
                                            <svg 
                                                stroke="currentColor" 
                                                fill="currentColor" 
                                                stroke-width="0" 
                                                viewBox="0 0 512 512" 
                                                height="1em" 
                                                width="1em" 
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M352 146.4c-34.4-48.6-67.5-78.5-90.8-96.6-3.1-2.4-7.3-2.4-10.4-.1-23 17.1-56.1 48.4-90.5 96.5-37.3 52-63 108.4-64.2 170.9 0 1.2-.1 2.5-.1 3.7 0 18.4 3.9 35.9 10.9 52.1 4.1 9.3 9.2 18.1 15.2 26.3 28.5 39 77.8 64.8 133.8 64.8 88.4 0 160.1-64.1 160.1-143.2 0-63.7-27-122.2-64-174.4zm-86 264.3h-.5c-9.9 0-12-14.1-2.6-17.1 45.1-14.2 69.6-38.5 86.4-80.8 3.5-8.9 16.7-6.5 16.8 3.1v1.4c-.1 51.6-44.9 93.4-100.1 93.4z"></path>
                                            </svg>
                                        </i>
                                        <span class="humidity-value"></span>
                                    </div>
                                    <div class="pressure">
                                        <i>
                                            <svg 
                                                stroke="currentColor" 
                                                fill="currentColor" 
                                                stroke-width="0" 
                                                viewBox="0 0 16 16" 
                                                height="1em" 
                                                width="1em" 
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M9.5 2.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.708l4.5-4.5a.5.5 0 01.708 0zm-7.5 7.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M2.036 9.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V10h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path>
                                            </svg>
                                        </i>
                                        <span class="pressure-value"></span>
                                    </div>
                                </div>
                            </div>

                            <img src="#" alt="weather icon" class="icon">
                        </div>
                    </div>
                </section>
                <section class="sun-state-content">
                    <div class="wrapper">
                        <div class="sun-state">
                            <div class="sunrise">
                                <div class="sunrise-sun"></div>
                                <h2 class="sunrise-time-value"></h2>
                            </div>
                            <div class="sun-state-illustration">
                            </div>
                            <div class="sunset">
                                <div class="sunset-sun"></div>
                                <h2 class="sunset-time-value"></h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="today-forecast-content">
                    <div class="wrapper">
                        <div class="today-forecast-container">
                            <h2 class="today-forecast-title">Today</h2>
                            <div class="hourly-forecast-cards"></div>
                        </div>
                    </div>
                </section>
                <section class="daily-forecast-content">
                    <div class="wrapper">
                        <div class="daily-forecast-container">
                            <div class="daily-forecast-cards"></div>
                        </div>
                    </div>
                </section>
        `;
    }
}