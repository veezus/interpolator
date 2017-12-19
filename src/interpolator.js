class MissingPlaceholderError extends Error { }

class Interpolator {
  constructor (options={}) {
    this._source = options.source || ''
    this._placeholders = options.placeholders || {}
    this.placeholderRegexp = /\${(\w+)}/g
  }

  parse () {
    return this.source.replace(this.placeholderRegexp, (match, placeholder) => {
      if (this.placeholders.hasOwnProperty(placeholder))
        return this.placeholders[placeholder]
      else
        throw new MissingPlaceholderError
    })
  }

  get placeholders () {
    return this._placeholders
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
