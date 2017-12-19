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

  describe("#result", () => {
    describe("#when parse has not been called yet", () => {
      it("returns an empty string", () => {
        let interpolator = new Interpolator({
          template: "A ${value} string",
          placeholders: { value: 'cached' }
        })
        expect(interpolator.result).toEqual('');
      });
    });

    describe("#when parse has previously been called", () => {
      it("returns the result of parse()", () => {
        let interpolator = new Interpolator({
          template: "A ${value} string",
          placeholders: { value: 'cached' }
        })
        // The order of arguments matters here, so `parse()` is called before
        // `result`
        expect(interpolator.parse()).toBe(interpolator.result)
        expect(interpolator.result).toEqual('A cached string')
      });
    });
  });
});
