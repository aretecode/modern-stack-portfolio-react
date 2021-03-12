import type { GetStaticProps } from 'next'
import type { ResumeEverythingType } from '../../../src/typings'
import { getStaticProps as getStaticPropsCommon } from '../../../src/graphql/apolloGetStaticProps'

export { getStaticPaths } from '../../../src/graphql/apolloGetStaticExperiencePages'

export const config = { amp: 'hybrid' }

export const getStaticProps: GetStaticProps = async context => {
  const { pid } = context.params as { pid?: string }
  const response = await getStaticPropsCommon(context)

  const responseWithProps = response as {
    props: ResumeEverythingType
    revalidate?: number | boolean
  }
  if (responseWithProps.props) {
    const { props, ...rest } = responseWithProps
    return {
      ...rest,
      props: {
        ...props,
        work: props.work.filter(workItem => workItem.id === pid),
      },
    }
  }
  return response
}

export { default } from '../../../src/pages/Portfolio/ExperiencePage'
