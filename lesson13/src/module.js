function renderModule() {
  var m = document.createElement('div');

  m.setAttribute('id', 'module');

  m.innerHTML = 'this is module';

  document.getElementById('root').append(m);
}

export default renderModule;
