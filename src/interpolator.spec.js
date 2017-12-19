const Interpolator = require('./interpolator').Interpolator;
const MissingPlaceholderError = require('./interpolator').MissingPlaceholderError;

describe("Interpolator", () => {
  describe("#parse", () => {
    describe("when the placeholders contain the interpolated values", () => {
      it("replaces a single placholder", () => {
        let interpolator = new Interpolator({
          template: 'Hello, ${name}',
          placeholders: { name: 'Bob' },
        })
        expect(interpolator.parse()).toEqual('Hello, Bob')
      });

      it("replaces multiple placeholders", () => {
        let interpolator = new Interpolator({
          template: 'Hello, ${name}${levelOfExclaim}',
          placeholders: {
            name: 'Beth',
            levelOfExclaim: '!',
          },
        })
        expect(interpolator.parse()).toEqual('Hello, Beth!')
      });

      it("replaces a single placeholder multiple times", () => {
        let template = 'Hello, ${name}${levelOfExclaim} '
          + 'I\'ve never met anyone named ${name} before.'
        let interpolator = new Interpolator({
          template: template,
          placeholders: {
            name: 'Cosimo',
            levelOfExclaim: '!',
          },
        })
        expect(interpolator.parse()).toEqual('Hello, Cosimo! I\'ve never met ' +
          'anyone named Cosimo before.')
      });

      it("allows numbers, underscores, and capital letters", () => {
        let interpolator = new Interpolator({
          template: '${Name_9}',
          placeholders: { Name_9: 'Beth' },
        })
        expect(interpolator.parse()).toEqual('Beth');
      });
    });

    describe("when the placeholders are missing one or more values", () => {
      it("throws a MissingPlaceholderError", () => {
        let interpolator = new Interpolator({ template: '${foobear}' })
        expect(() => { interpolator.parse() }).toThrow(MissingPlaceholderError)
      });
    });

    describe("when the template has a doubly-interpolated placholder", () => {
      it("preserves the outermost pair", () => {
        let interpolator = new Interpolator({
          template: 'Hello, ${${name}}',
          placeholders: { name: 'Beth' },
        });
        expect(interpolator.parse()).toEqual('Hello, ${Beth}');
      });
    });
  });
});
