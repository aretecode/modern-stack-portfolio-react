/**
 * can split ResumeContext & ResumeProvider
 */
import * as React from 'react'
import { Query } from 'react-apollo'
import { EMPTY_ARRAY } from '../utils/EMPTY'
import ResumeQuery from '../graphql/Resume'
import { defaultApolloStateResume } from '../apolloState'
import { ResumeResponse, GraphqlProps, BasicsType, WorkType } from '../typings'

export interface ResumeContextType {
  isLoading?: boolean
  basics: BasicsType
  work: WorkType[]
}

export const ResumeContext = React.createContext<ResumeContextType>(
  defaultApolloStateResume
)

/**
 * @todo @@perf can simplify & improve
 */
function fromResponseToSafeValue(response: GraphqlProps<ResumeResponse>) {
  const data = { resume: EMPTY_ARRAY, ...response.data! }
  const { refetch, loading } = response
  const resume = {
    basics: data.resume.basics || {
      profiles: EMPTY_ARRAY,
    },
    work: data.resume.work || EMPTY_ARRAY,
  }
  const value = { isLoading: !!loading, refetch, ...resume }
  return value
}

export class ResumeProvider extends React.PureComponent {
  renderContext = (response: GraphqlProps<ResumeResponse>) => {
    const value = fromResponseToSafeValue(response)
    return (
      <ResumeContext.Provider value={value}>
        {this.props.children}
      </ResumeContext.Provider>
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
