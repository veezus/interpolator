# Interpolator

Interpolator was written as a solution for a coding challenge. It accepts a template and a collection of placeholders; calling the `parse` function will return a string with placeholders replaced by their respective values. If a placeholder is present in the template but not in the map, a `MissingPlaceholderError` will be thrown.

## Example

For more comprehensive examples, see `./src/interpolator.spec.js`.

```javascript
(new Interpolator({
  template: "${name} has an appointment on ${day}",
  placeholders: {
    name: 'Billy',
    day: 'Thursday',
  },
})).parse();

// => "Billy has an appointment on Thursday"
```