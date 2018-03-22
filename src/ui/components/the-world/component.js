import Component from '@ember/component';
import { task, race } from 'ember-concurrency';
import { rAF, waitForEvent } from './-utils/concurrency';

export default Component.extend({
  run: task(function * () {
    this.dots = [];
    while (true) {
      this.set('dots', this.dots.map(({x,y,r,hue}) => ({
        x: x + 1,
        y,
        r,
        hue
      })));
      yield rAF();
    }
  }).on('init'),

  pickSize: task(function * (startEvent) {
    this.set('newDot', { x: startEvent.x, y: startEvent.y, r: 0, hue: 0 });
    while (true) {
      let event = yield race([
        waitForEvent(window, 'mousemove'),
        waitForEvent(window, 'mouseup')
      ]);
      let dx = event.x - startEvent.x;
      let dy = event.y - startEvent.y;
      let r = Math.round(Math.sqrt(dx*dx + dy*dy));
      this.set('newDot', {
        x: this.newDot.x,
        y: this.newDot.y,
        r,
        hue: r % 360
      });
      if (event.type === 'mouseup') {
        break;
      }
    }
    this.set('dots', this.dots.concat([this.newDot]));
    this.set('newDot', null);
  })


});
