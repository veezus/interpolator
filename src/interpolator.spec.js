const Interpolator = require('./interpolator').Interpolator;
const MissingPlaceholderError = require('./interpolator').MissingPlaceholderError;

describe("Interpolator", () => {
  describe("#parse", () => {
    describe("when the dictionary contains the interpolated values", () => {
      it("replaces a single placholder", () => {
        let interpolator = new Interpolator({
          source: 'Hello, ${name}',
          dictionary: {
            name: 'Bob',
          },
        })
        expect(interpolator.parse()).toEqual('Hello, Bob')
      });

      it("replaces multiple placeholders", () => {
        let interpolator = new Interpolator({
          source: 'Hello, ${name}${levelOfExclaim}',
          dictionary: {
            name: 'Beth',
            levelOfExclaim: '!',
          },
        })
        expect(interpolator.parse()).toEqual('Hello, Beth!')
      });

      it("replaces a single placeholder multiple times", () => {
        let source = 'Hello, ${name}${levelOfExclaim} '
          + 'I\'ve never met anyone named ${name} before.'
        let interpolator = new Interpolator({
          source: source,
          dictionary: {
            name: 'Cosimo',
            levelOfExclaim: '!',
          },
        })
        expect(interpolator.parse()).toEqual('Hello, Cosimo! I\'ve never met ' +
          'anyone named Cosimo before.')
      });

      it("allows numbers, underscores, and capital letters", () => {
        let interpolator = new Interpolator({
          source: '${Name_9}',
          dictionary: { Name_9: 'Beth' },
        })
        expect(interpolator.parse()).toEqual('Beth');
      });
    });

    describe("when the dictionary is missing one or more values", () => {
      it("throws a MissingPlaceholderError", () => {
        let interpolator = new Interpolator({ source: '${foobear}' })
        expect(() => { interpolator.parse() }).toThrow(MissingPlaceholderError)
      });
    });

    describe("when the source has a doubly-interpolated placholder", () => {
      it("preserves the outermost pair", () => {
        let interpolator = new Interpolator({
          source: 'Hello, ${${name}}',
          dictionary: { name: 'Beth' },
        });
        expect(interpolator.parse()).toEqual('Hello, ${Beth}');
      });
    });
  });
});
