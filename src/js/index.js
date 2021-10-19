import '../style/main.css';
import City from './views/City';
import Cities from './views/Cities';
import {loadCityData} from './loadCityData'
import {loadCitiesData} from './loadCitiesData'

const navigationLinks = document.querySelectorAll('.nav-link');

const router = async () => {
  const routes = [{
      path: '/',
      view: City,
    },
    {
      path: '/cities',
      view: Cities,
    }
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: window.location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  document.querySelector('.main').innerHTML = await view.getHtml();

  switch (match.route.path) {
    case '/':
      navigationLinks[0].classList.add('active-page');
      navigationLinks[1].classList.remove('active-page');
      loadCityData();
      break;
    case '/cities':
      navigationLinks[1].classList.add('active-page');
      navigationLinks[0].classList.remove('active-page');
      loadCitiesData();
      break;
    default:
      navigationLinks[0].classList.add('active-page');
      navigationLinks[1].classList.remove('active-page');
      break;
  }
};

const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    if (event.target.matches('[data-link]')) {
      event.preventDefault();
      navigateTo(event.target.parentNode.href);
    }
  });

  router();
});