import style from './style.less';

const a = document.createElement('div');
a.innerHTML = 'this is a module';
a.classList.add('box');

const b = document.createElement('div');
b.innerHTML = 'this is b module';
b.classList.add(style.box);

document.getElementById('root').appendChild(a);
document.getElementById('root').appendChild(b);
