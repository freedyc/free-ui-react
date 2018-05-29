# history

``` javascript
import { createHisotry } from '@gsmlg/history';
const history = createHistroy();
history.start();

history.subscirbe((location) => {
  location === '/wasabi';
});

history.push('/wasabi');

```


