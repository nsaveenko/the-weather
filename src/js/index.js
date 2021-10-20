import '../style/main.css';
import City from './views/City';
import Cities from './views/Cities';
import loadCityData from './loadCityData';
import loadCitiesData from './loadCitiesData';

const routes = [
  { path: '/city', View: City },
  { path: '/cities', View: Cities },
];

const renderView = async (match) => {
  const view = new match.route.View();
  document.querySelector('.main').innerHTML = await view.getHtml();
};

const renderNavigationStyles = (match) => {
  const navigationLinks = document.querySelectorAll('.nav-link');
  if (match.route.path === '/cities') {
    navigationLinks[1].classList.add('active-page');
    navigationLinks[0].classList.remove('active-page');
  } else {
    navigationLinks[0].classList.add('active-page');
    navigationLinks[1].classList.remove('active-page');
  }
};

const loadData = (match) => {
  if (match.route.path === '/cities') {
    loadCitiesData();
  } else {
    loadCityData();
  }
};

const router = async () => {
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

  await renderView(match);
  renderNavigationStyles(match);
  loadData(match);
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
      if (!event.target.parentNode.classList.contains('active-page')) {
        navigateTo(event.target.parentNode.href);
      }
    }
  });

  router();
});

export default navigateTo;
