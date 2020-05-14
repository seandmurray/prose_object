# prose_object

Copyright (c) 2020 Seán D. Murray
SEE MIT LICENSE FILE

An object Utility. Make writing node easier, prettier and less error prone. Writes and reads more like prose.

## Usage

```javascript
const object_util = require('@lib/object-util');

object_util.copy(object, orderItems); // Deep copy an object. If orderItems is true then object keys and array items are sorted in order.

object_util.equal(object1, object2); // Does a deep comparison of two objects and returns true if they both match.

object_util.has(object, key); // Returns true if the object has that key.

object_util.notHave(obj, key); // Return false if the object has that key.

object_util.toHash(obj, orderItems); // Turns an object into a unique hash value. If orderItems is set true then the object keys and array items are sorted first.
```
