import $ from 'jquery';
import FastClick from 'fastclick';
import App from '../lib/app';

const app = new App();

app.config = JSON.parse($('#main-js').html());

app.regInit(() => {
  app.$ = {
    win: $(window),
    doc: $(document),
    docEl: $(document.documentElement),
    html: $('html'),
    body: $('body'),
    htmlBody: $('html, body'),
    header: $('#header'),
    main: $('#main'),
    footer: $('#footer'),
  };
  app.name = '{%= name %}';
  app.lang = app.$.html.attr('lang');

  // attach fastclick listener
  FastClick.attach(document.body);

  // add os specific classes
  app.isAndroid && app.$.html.addClass('is-android');
  app.isIos && app.$.html.addClass('is-ios');
  app.isIphone && app.$.html.addClass('is-iphone');
  app.isIpad && app.$.html.addClass('is-ipad');
  app.isSafari && app.$.html.addClass('is-safari');
  app.isIE && app.$.html.addClass('is-ie');
  app.isEdge && app.$.html.addClass('is-edge');
});

export default app;
