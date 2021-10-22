# prose_object

Copyright (c) 2020 Seán D. Murray
SEE MIT LICENSE FILE

An object Utility. Make writing node easier, prettier and less error prone. Writes and reads more like prose.

## Usage

```javascript
const object_util = require('prose_object');

object_util.copy(object, orderItems); // Deep copy an object. If orderItems is true then object keys and array items are sorted in order.

object_util.equal(object1, object2); // Does a deep comparison of two objects and returns true if they both match.

/*
  flatten all objects to a one dimensional set of key:values
  default object spearator is a dot
  default array spearator is a colon
  such that {"a": { "one": 2, "three": "four" }, "b": [ 5, "six" ]}
  becomes { 'a.one': 2, 'a.three': 'four', 'b:0': 5, 'b:1': 'six' }
*/
object_util.flatten(object, optionalObjectSeparator, optionalArraySeparator);

object_util.has(object, key); // Returns true if the object has that key.

object_util.notHave(obj, key); // Return false if the object has that key.

object_util.toHash(obj, orderItems); // Turns an object into a unique hash value. If orderItems is set true then the object keys and array items are sorted first.
```
