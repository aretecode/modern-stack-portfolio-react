/**
 * can split PortfolioContext & PortfolioProvider
 */
import * as React from 'react'
import { Query } from 'react-apollo'
import { EMPTY_ARRAY } from '../utils/EMPTY'
import ResumeQuery from '../graphql/Resume'
import { defaultApolloStatePortfolio } from '../apolloState'
import { ResumeResponse, GraphqlProps, BasicsType, WorkType } from '../typings'

export interface PortfolioContextType {
  isLoading?: boolean
  basics: BasicsType
  work: WorkType[]
}

export const PortfolioContext = React.createContext<PortfolioContextType>(
  defaultApolloStatePortfolio
)

/**
 * @todo @@perf can simplify & improve
 */
function fromResponseToSafeValue(response: GraphqlProps<ResumeResponse>) {
  const data = { portfolio: EMPTY_ARRAY, ...response.data! }
  const { refetch, loading } = response
  const portfolio = {
    basics: data.resume.basics || {
      profiles: EMPTY_ARRAY,
    },
    work: data.resume.work || EMPTY_ARRAY,
  }
  const value = { isLoading: !!loading, refetch, ...portfolio }
  return value
}

export class PortfolioProvider extends React.PureComponent {
  renderContext = (response: GraphqlProps<ResumeResponse>) => {
    const value = fromResponseToSafeValue(response)
    return (
      <PortfolioContext.Provider value={value}>
        {this.props.children}
      </PortfolioContext.Provider>
    )
  }

  render() {
    return (
      <Query<ResumeResponse>
        query={ResumeQuery}
        fetchPolicy="cache-and-network"
      >
        {this.renderContext}
      </Query>
    )
  }
}
