const WRITEABLE_MIME_TYPES = [
  'text/html',
  'text/css',
  'text/xml',
  'text/javascript',
  'application/javascript',
  'application/json'
]

module.exports = function bodyHostRewriter (host, port) {
  const searchValues = []
  const portSuffix = port ? ':' + port : ''
  searchValues.push(host + portSuffix)

  // kirby markdown extension encodes '[' and ']' from hostname
  // this fix rewrites urls wrongly encoded from kirby
  if (host === '[::1]') searchValues.push('%5B::1%5D' + portSuffix)

  return function (res, newValue) {
    const _write = res.write
    res.write = function (data) {
      let contentType = res.getHeader('content-type')
      if (!contentType) return _write.call(res, data)
      contentType = contentType.trim().split(';')[0] || ''
      if (WRITEABLE_MIME_TYPES.indexOf(contentType) !== -1) {
        let nData = data.toString()
        searchValues.forEach(searchValue => {
          nData = nData.split(searchValue).join(newValue)
        })
        _write.call(res, nData)
      } else {
        _write.call(res, data)
      }
    }
  }
}
