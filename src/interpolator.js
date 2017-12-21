class MissingPlaceholderError extends Error { }

class Interpolator {
  constructor (options={}) {
    this._template = options.template || ''
    this._placeholders = options.placeholders || {}
    this.placeholderRegexp = /\${(\w+)}/g
  }

  parse () {
    this.result = this.template.replace(this.placeholderRegexp,
      this.replacePlaceholder.bind(this))
    return this.result
  }

  replacePlaceholder (match, placeholder) {
    if (this.placeholders.hasOwnProperty(placeholder))
      return this.placeholders[placeholder]
    else
      throw new MissingPlaceholderError(`Missing ${placeholder} placeholder`)
  }

  get placeholders () {
    return this._placeholders
  }

  get result () {
    return this._result || ''
  }

  set result (value) {
    return this._result = value
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
