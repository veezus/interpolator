class MissingPlaceholderError extends Error { }

class Interpolator {
  constructor (options={}) {
    this._template = options.template || ''
    this._placeholders = options.placeholders || {}
    this.placeholderRegexp = /\${(\w+)}/g
  }

  parse () {
    this._result = this.template.replace(this.placeholderRegexp,
      this.replacePlaceholder.bind(this))
    return this.result
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

  get result () {
    return this._result || ''
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
