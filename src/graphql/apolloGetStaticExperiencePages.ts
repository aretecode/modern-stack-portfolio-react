/** @todo use gql to query just work by id */
import type { GetStaticPaths } from 'next'
import { gql } from '@apollo/client'
import { initApolloClient } from './apolloClient'

const GET_EXPERIENCE_IDS = gql`
  query {
    website(id: "6Hj7WP8kLonf5VHyQPoES3") {
      workCollection {
        items {
          id
        }
      }
    }
  }
`

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const apolloClient = initApolloClient()
  const gqlResponse = await apolloClient.query<{
    website: {
      workCollection: {
        items: {
          id: string
        }[]
      }
    }
  }>({
    query: GET_EXPERIENCE_IDS,
    errorPolicy: 'all',
  })

  return {
    paths: gqlResponse.data.website.workCollection.items.map(({ id }) => ({
      params: { pid: id },
    })),
    fallback: false,
  }
}
