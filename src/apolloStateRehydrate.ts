/**
 * @file has side effects, can export and call in side effects setup file
 */
import { initApolloClient } from './apolloClient'
import { resumeKeyValStore } from './storage'
import SetResume from './graphql/SetResume'

function rehydrate() {
  return resumeKeyValStore.get('resume').then(async resume => {
    if (resume !== undefined) {
      await initApolloClient().mutate({
        mutation: SetResume,
        variables: resume,
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
