/**
 * @todo should get these from a different query for full runtime changeability
 */
const prodEnv = {
  NODE_ENV: 'production',
  WEBSITE_ORIGIN: 'https://jameswiens.dev',
  STYLIS_SHOULD_PREFIX: 'false',
  GOOGLE_TAG_MANAGER_AMP_ID: 'GTM-WHL4TS3',
  GOOGLE_TAG_MANAGER_WEB_ID: 'GTM-P58WR63',
  GRAPHQL_API_URL: 'https://jameswiens-graphql.now.sh/graphql',
}
const devEnv = {
  NODE_ENV: 'development',
  WEBSITE_ORIGIN: 'http://localhost:3000',
  STYLIS_SHOULD_PREFIX: 'false',
  GOOGLE_TAG_MANAGER_AMP_ID: 'GTM-WHL4TS3',
  GOOGLE_TAG_MANAGER_WEB_ID: 'GTM-P58WR63',
  GRAPHQL_API_URL: 'https://jameswiens-graphql.now.sh/graphql',
}
const testEnv = {
  NODE_ENV: 'test',
  WEBSITE_ORIGIN: 'http://localhost:3000',
  STYLIS_SHOULD_PREFIX: 'false',
  GOOGLE_TAG_MANAGER_AMP_ID: 'AMP_ID',
  GOOGLE_TAG_MANAGER_WEB_ID: 'WEB_ID',
  GRAPHQL_API_URL: 'https://jameswiens-graphql.now.sh/graphql',
}
const env =
  process.env.NODE_ENV === 'test'
    ? testEnv
    : process.env.NODE_ENV !== 'production'
    ? devEnv
    : prodEnv

Object.keys(env).forEach(key => {
  process.env[key] = env[key]
})

exports.testEnv = testEnv
exports.prodEnv = prodEnv
exports.devEnv = devEnv
exports.env = env

const { NODE_ENV, ...remainingEnv } = env
exports.envWithoutNodeEnv = remainingEnv
