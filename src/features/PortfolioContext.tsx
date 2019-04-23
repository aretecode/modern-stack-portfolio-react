/**
 * can split PortfolioContext & PortfolioProvider
 */
import * as React from 'react'
import { Query } from 'react-apollo'
import { EMPTY_ARRAY, EMPTY_OBJ } from '../utils/EMPTY'
import { isObj } from '../utils/is'
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
 * @see /packages/graphql/src/graphql-modules/resume/utils.ts
 */
export function isValidResumeValue(
  response: GraphqlProps<ResumeResponse>
): response is GraphqlProps<Required<ResumeResponse>> {
  return (
    isObj(response) === true &&
    isObj(response.data) === true &&
    isObj(response.data!.resume) === true &&
    Array.isArray(response.data!.resume.work) &&
    isObj(response.data!.resume.basics) === true &&
    Object.keys(response.data!.resume.basics).length > 0
  )
}
/**
 * @todo @@perf can simplify & improve
 */
function fromResponseToSafeValue(response: GraphqlProps<ResumeResponse>) {
  const portfolio = isValidResumeValue(response)
    ? response.data!.resume
    : defaultApolloStatePortfolio

  const { refetch, loading } = response
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
