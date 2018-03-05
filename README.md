# sizeofvar

## Description
sizeofvar allows you to get a realistic memory size of any variable upon initialization or variable setting.  

## Install
```bash
npm i @cldmv/sizeofvar --save
```

## Usage
```Javascript
const sizeofvar = require('sizeofvar');
console.log(sizeofvar(variable));
```





## Test Examples
The included tests allow you to verify that the number returned from this module represents the memory usage reported by node for a variable.
```Javascript
node -expose-gc test/test-mem.js command [-v]
```
#### -expose-gc
This option is required to run the memory tests. Without it you will recieve an error.

#### test/test-mem.js
This is the test file. It handles a command to test various variable tests.

#### command
Valid values are:
* array
* bool
* number
* object
* object-complex
* object-key-length
* object-string
* string
