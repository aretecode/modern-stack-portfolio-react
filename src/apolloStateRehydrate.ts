/**
 * @file has side effects, can export and call in side effects setup file
 */
import { initApolloClient } from './apolloClient'
import { portfolioKeyValStore } from './storage'
import SetResume from './graphql/SetResume'

function rehydrate() {
  return portfolioKeyValStore.get('portfolio').then(async portfolio => {
    if (portfolio !== undefined) {
      await initApolloClient().mutate({
        mutation: SetResume,
        variables: portfolio,
      })
    }
  })
}

/**
 * @note - does not work by updating `defaults` in apolloState
 */
if (typeof window === 'object') {
  rehydrate()
}
