# RTL Support for [jss](https://github.com/cssinjs/jss)

This plugin enables right-to-left support by flipping every rule on the x-axis.
Internally, it's wrapping [rtl-css-js](https://github.com/kentcdodds/rtl-css-js).

You can write your application left-to-right and then turn it into right-to-left using this plugin.
Or you can start right-to-left and turn it into left-to-right.

Make sure you read [how to use
plugins](https://github.com/cssinjs/jss/blob/master/docs/setup.md#setup-with-plugins)
in general.

**Important Notice**: This plugin must come last in the plugin array since it only transforms
raw styles.

## Installation

You can install this package with the following command:

```sh
npm install jss-rtl
```

## Examples

These examples will give you a brief overview of how this library is used:


### Simple Usage

You can use `jss.use(...)` to augment the global `jss` instance.

```javascript
import jss from 'jss';
import rtl from 'jss-rtl';

jss.use(rtl());

const styles = {
  foo: {
    'padding-left': '2px',
    'margin-right': '2px',
  },
  bar: {
    'transform': 'translate3d(30%, 20%, 10%)',
  },
  baz: {
    flip: false, // opt-out of conversion for a specific rule-set
    'margin-right': '1px',
  },
};

jss.createStyleSheet(styles); /* =>
.foo-0-0 {
  padding-right: 2px;
  margin-left: 2px;
}
.bar-0-1 {
  transform: translate3d(-30%, 20%, 10%);
}
.baz-0-2 {
  margin-right: 1px;
}
*/
```

Or you can use the `jss-preset-default` library and append this one to the end.

```javascript
import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';

const presets = preset().plugins;

const jss = create({ plugins: [...presets, rtl()] });

// ...
```

## Opting-out for an entire sheet

You can opt-out for a sheet entirely.

```javascript
const styles = {
  foo: {
    'padding-left': '2px',
    'margin-right': '2px',
  },
  baz: {
    flip: true, // rules take precedence, this one is forced to flip
    'margin-right': '1px',
  },
};

jss.createStyleSheet(styles, { flip: false }); /* =>
.foo-0-0 {
  padding-left: 2px;
  margin-right: 2px;
}
.baz-0-1 {
  margin-left: 1px;
}
*/
```

## Option `enabled`

While using this library you might add `flip: false` or `flip: true` to some of your
rule-sets. It is recommended that you disable this plugin instead of removing it
from the plugins array so that it can at least remove the `flip` props from your rule-sets.

```javascript
jss.use(rtl({ enabled: false }));

const styles = {
  foo: {
    'padding-left': '2px',
    'margin-right': '2px',
  },
  baz: {
    flip: true, // This gets overruled by enable: false, and gets removed from the rule-set
    'margin-right': '1px',
  },
};

// Doesn't matter, rtl is disabled entirely
jss.createStyleSheet(styles, { flip: true }); /* =>
.foo-0-0 {
  padding-left: 2px;
  margin-right: 2px;
}
.baz-0-1 {
  margin-right: 1px;
}
*/
```

## Option `opt`

It's also possible to change the default behavior to `opt-in`.

```javascript
jss.use(rtl({ opt: 'in' }));

const styles = {
  foo: { // This is ignored by the plugin
    'padding-left': '2px',
    'margin-right': '2px',
  },
  baz: {
    flip: true, // This gets flipped
    'margin-right': '1px',
  },
};

jss.createStyleSheet(styles); /* =>
.foo-0-0 {
  padding-left: 2px;
  margin-right: 2px;
}
.baz-0-1 {
  margin-left: 1px;
}
*/

// Or opt-in an entire sheet

const styles = {
  foo: {
    'padding-left': '2px',
    'margin-right': '2px',
  },
  baz: {
    'margin-right': '1px',
  },
};

jss.createStyleSheet(styles, { flip: true }); /* =>
.foo-0-0 {
  padding-right: 2px;
  margin-left: 2px;
}
.baz-0-1 {
  margin-left: 1px;
}
*/
```

## Typings

The typescript type definitions are also available and are installed via npm.

## License
This project is licensed under the [MIT license](https://github.com/alitaheri/jss-rtl/blob/master/LICENSE).