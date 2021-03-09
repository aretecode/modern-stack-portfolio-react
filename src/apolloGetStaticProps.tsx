/** @file download data on the server so that it does not need to be fetched on the browser. runs at compile time and run time. */
import { GetStaticProps } from 'next'
import type { ResumeResponse, ResumeType } from './typings'
import ResumeQuery from './graphql/Resume'
import { initApolloClient } from './apolloClient'
import { logger } from './log'

export const getStaticProps: GetStaticProps = async context => {
  const apolloClient = initApolloClient()
  const gqlResponse = await apolloClient.query<ResumeResponse>({
    query: ResumeQuery,
    errorPolicy: 'all',
  })

  if (!gqlResponse.data && gqlResponse.errors) {
    logger.error(gqlResponse.errors)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } else if (process.env.NODE_ENV !== 'production') {
    logger.debug('graphql_get_static_props')
    logger.info(gqlResponse.data)
  }

  return {
    props: {
      openSource: gqlResponse.data.website.projectsCollection.items[0],
      person: {
        ...gqlResponse.data.website.person,
        profiles: gqlResponse.data.website.person.profilesCollection.items,
      },
      work: gqlResponse.data.website.workCollection.items.map(item => ({
        ...item,
        summary: (item as any).summary.json.content[0].content[0].value,
        highlights: (item as any).highlights.json.content[0].content[0].value,
      })),
    } as ResumeType,
  }
}
