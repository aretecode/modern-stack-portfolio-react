// "routes": [
//   {
//     "src": "/(.*)",
//     "dest": "@now/node@canary",
//     "headers": {
//       "cache-control": "max-age=43200, s-maxage=86400"
//      }
//   }
// ]
// "builds": [
//   {
//     "src": "package.json",
//     "use": "@now/node@canary",
//     "config": {
//       "maxLambdaSize": "50mb"
//     }
//   }
// ]

export { default } from './server'
