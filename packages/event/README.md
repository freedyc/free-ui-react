# Events

```
const obj = {};

Events.wrap(obj);

obj.on('go', console.log);

obj.trigger('go');

obj.off('go');

obj.trigger('go');

```

