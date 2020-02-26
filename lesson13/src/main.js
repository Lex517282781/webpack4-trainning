import './style.css';

import renderModule from './module';

renderModule();

if (module.hot) {
  module.hot.accept('./module', function() {
    document
      .getElementById('root')
      .removeChild(document.getElementById('module'));
    renderModule();
  });
}
