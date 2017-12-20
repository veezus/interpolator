# Interpolator

Interpolator was written as a solution for a coding challenge. It accepts a
template and a collection of placeholders; calling the `parse` function will
return a string with placeholders replaced by their respective values. If a
placeholder is present in the template but not in the map, a
`MissingPlaceholderError` will be thrown.

## Example

For more comprehensive examples, see `./src/interpolator.spec.js`.

```javascript
let interpolator = new Interpolator({
  template: "${name} has an appointment on ${day}",
  placeholders: {
    name: 'Billy',
    day: 'Thursday',
  },
})
interpolator.parse(); // => "Billy has an appointment on Thursday"
interpolator.result; // => Cached result of parse()
```
## Example Application

You can also find an example expressjs application in the `example-app`
directory, with both server- and client-side rendering. Both the Interpolator
library and example app are built against node 9.3.0.

```bash
interpolator $ cd example-app
interpolator $ npm install
interpolator $ npm start
```

Examples can be found at the root of the app server and at
`http://localhost:8888/client-side.html`.
