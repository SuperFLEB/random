# @superfleb/random

Some functions for random characters for names of things.

## To Install

This package is included in the GitHub Package Registry, so you will need to be registered
to that, with your personal PAT, for the @superfleb namespace.

```shell
# for NPM
npm install @superfleb/random

# for Yarn
yarn add @superfleb/random
```

## To import

There are two ES-style modules currently included in this package, along with a barrel file that provides all imports.
(CommonJS is not supported.)

```javascript
// Import any of the utilities from the package
import { RandomCharSet, chars, Namespace } from "@superfleb/random";

// Import only the package for random characters
import chars, { RandomCharSet } from "@superfleb/random/chars";

// Import only the package for random namespacing
import Namespace from "@superfleb/random/namespace";
```

## @superfleb/random/chars

This provides a function to generate any number of random characters of a given character set.

### Example:
```javascript
import chars, { RandomCharSet } from "@superfleb/random/chars";

const charSet = RandomCharSet.xml;
const myRandomChars = chars(5, "_", "_name", charSet); // "_xxxxx_name"
```

All parameters are optional.

1. Length (number, default `5`): How many characters to generate
2. Prefix (string, default `""`): What to put before the random characters
3. Suffix (string, default `""`): What to put after the random characters
4. Character Set: (string, default `RandomCharSet.biased`). This can be one of the values from the RandomCharSet object:
   * `RandomCharSet.biased` - Characters broadly allowed, but `_` is included twice, so there is a slight bias toward `_`: `A-Z`, `a-z`, `0-9`, `_`
   * `RandomCharSet.xml` - Characters allowed in XML IDs: `A-Z`, `a-z`, `0-9`, `_`, and `-`
   * `RandomCharSet.js` - Characters allowed in JavaScript variables and identifiers: `A-Z`, `a-z`, `0-9`, `_`, and `$`
   * `RandomCharSet.alpha32` - `A-Z` and `a-f`
   * `RandomCharSet.hex` - `0-9` and `a-f`,
   * `RandomCharSet.hexUpper` - `0-9` and `A-F`,

## @superfleb/random/namespace

Tools for working with a random "namespace", to quickly generate suffixed names off a common random string, and to
create URL fragments and `url(...)` properties from them.

This is a class-based module. Instantiate the class, and use its methods to generate names.

Example:

```javascript
import Namespace from "@superfleb/random/namespace";

// Creates an instance with a random string
const ns = new Namespace();

// Just the random string, e.g. "_xxxxx"
const justId = ns.id();

// The random string with the given suffix, e.g., "_xxxxx_widget"
const name = ns.id("_widget");

// The random string with a suffix as a URL fragment, e.g. "#_xxxxx_widget"
const fragment = ns.fragment("_widget");

// The random string with a suffix in a `url(...)` property. You can specify the quote type to use, or omit that to use a single quote.
const url = ns.url("_widget", "'");
```

### Other methods and options

```javascript
import {RandomCharSet} from "@superfleb/random/chars";
import Namespace from "@superfleb/random/namespace";

// Full signature of the constructor:
const ns = new Namespace(
        5,
        "_",
        RandomCharSet.biased,
        false
);
```

All parameters are optional.

1. Length (number, default `5`): How many characters to generate
2. Prefix (string, default `"_"`): What to put before the random characters. By default, an underscore is added, so random names starting with a digit are still valid.
3. Character Set (string, default `RandomCharSet.biased`): A RandomCharSet entry. See `chars` above for information.
4. Prefix Instance Names (boolean, default `false`): If `true`, any names will be added before, not after, of the random name.

If you want to change the random string to a string of your own, use the `setId` method. This will change the base ID
for any subsequent calls to the string you specify. This kind of defeats the purpose of the ID being random, but
it's there if you need it.

```javascript
import Namespace from "@superfleb/random/namespace";

const ns = new NS();
ns.setId("mySpecificId");
const name = ns.id("_widget"); // "mySpecificId_widget"
```

By default, names are added to the end of the random string, but if you want your names to be prefixes, you have two
options. You can set the Prefix Instance Names flag when instantiating the Namespace class, or you can set the last
parameter `true` to swap the position from the default or specified one.

```javascript
import {RandomCharSet} from "@superfleb/random/chars";
import Namespace from "@superfleb/random/namespace";

const nsDefault = new NS();
const nameDefaultNormal = nsDefault.id("_widget");           // "_xxxxx_widget"
// The "swap" flag makes this go from suffixed to prefixed
const nameDefaultSwap = nsDefault.id("_widget", true);       // "_widget_xxxxx"
const fragDefaultSwap = nsDefault.fragment("_widget", true); // "#_widget_xxxxx"
const urlDefaultSwap = nsDefault.url("_widget", "'", true);  // "url('#_widget_xxxxx')"

const nsPrefix = new NS(5, "_", RandomCharSet.biased, true); // "true" makes this one prefix, not suffix, by default.
const namePrefixNormal = nsPrefix.id("_widget");             // "_widget_xxxxx"
// The "swap" flag makes this go from prefixed to suffixed
const namePrefixSwap = nsPrefix.id("_widget", true);         // "_xxxxx_widget"
const fragPrefixSwap = nsPrefix.fragment("_widget", true);   // "#_xxxxx_widget"
const urlPrefixSwap = nsPrefix.url("_widget", "'", true);    // "url('#_xxxxx_widget')"
```
