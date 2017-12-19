class MissingPlaceholderError extends Error { }

class Interpolator {
  constructor (options={}) {
    this._source = options.source || ''
    this._dictionary = options.dictionary || {}
    this.placeholderRegexp = /\${(\w+)}/g
  }

  parse () {
    return this.source.replace(this.placeholderRegexp, (match, placeholder) => {
      if (this.dictionary.hasOwnProperty(placeholder))
        return this.dictionary[placeholder]
      else
        throw new MissingPlaceholderError
    })
  }

  get dictionary () {
    return this._dictionary
  }

  get source () {
    return this._source
  }
}

if (typeof module !== 'undefined')
  module.exports = {
    Interpolator: Interpolator,
    MissingPlaceholderError: MissingPlaceholderError,
  }
