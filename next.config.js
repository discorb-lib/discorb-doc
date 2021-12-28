const urlPrefix = process.env.NEXT_PUBLIC_URL_PREFIX ? '/' + process.env.NEXT_PUBLIC_URL_PREFIX : ''

module.exports = {
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
}