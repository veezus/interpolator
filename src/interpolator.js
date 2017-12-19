class MissingPlaceholderError extends Error { }

class Interpolator {
  constructor (options={}) {
    this._template = options.template || ''
    this._placeholders = options.placeholders || {}
    this.placeholderRegexp = /\${(\w+)}/g
  }

  parse () {
    return this.template.replace(this.placeholderRegexp,
      this.replacePlaceholder.bind(this))
  }

  replacePlaceholder (match, placeholder) {
    if (this.placeholders.hasOwnProperty(placeholder))
      return this.placeholders[placeholder]
    else
      throw new MissingPlaceholderError
  }

  get placeholders () {
    return this._placeholders
  }

  get template () {
    return this._template
  }
}

if (typeof module !== 'undefined')
  module.exports = {
    Interpolator: Interpolator,
    MissingPlaceholderError: MissingPlaceholderError,
  }
