require('../scss/main.scss');

import $ from 'jquery';
import Modernizr from 'modernizr';
import Button from './partials/button';
import Image from './partials/image';
import {mul} from './partials/mathLib';

let $app = $('#app');
let newText = () => ('<h1>Testing ES6</h1>');
let newButton = () => (Button.button);
let newImage = () => (`${Image}`);

$app.html(''); // Clean DOM before append

$app.append(newText());

$app.append(`
  <div id="menu">
    <button id="page1">Page 1</button>
    <button id="page2">Page 2</button>
  </div>
  <div id="menuContent">
    <h1>Home</h1>
  </div>
`);

$app.append('<div>' + newButton() + '</div>');
$app.append('<div>' + newImage() + '</div>');

let calcVal = 5;
const newShit = () => (mul(calcVal, calcVal));
$app.append(`<div>${calcVal} * ${calcVal} = ` + newShit() + '</div>');

const newAppStatus = () => (`
  <div class="envStatus">
    DEV: ${DEVELOPMENT.toString()} | PRD: ${PRODUCTION.toString()}
  </div>
`);
$app.append(newAppStatus());

Button.attachEl();

$('#page1').on('click', () => {
  System.import('./partials/page1')
    .then((pageModule) => {
      $('#menuContent').html(pageModule.default);
    });
});

$('#page2').on('click', () => {
  System.import('./partials/page2')
    .then((pageModule) => {
      $('#menuContent').html(pageModule.default);
    });
});

if (DEVELOPMENT) {
  if (module.hot) {
    module.hot.accept();
  }
}
