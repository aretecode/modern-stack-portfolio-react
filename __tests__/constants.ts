import { ResumeType } from '../src/typings'

export const nonApollo = {
  repoUrl: 'https://github.com/aretecode/modern-stack-web-portfolio',
  workSummaryPicture:
    'https://noccumpr-cdn.sirv.com/images/james-wiens-work-experience-combined-filtered.png',
} as const

export const defaultApolloStatePortfolio: ResumeType = {
  person: {
    orcid: '',
    name: '',
    label: '',
    image: {
      title: 'eh',
      url: nonApollo.workSummaryPicture,
      width: 100,
      height: 100,
      srcSizes: [['', '', 0, 0]],
    },
    email: 'james@jameswiens.com',
    telephone: '12506509455',
    website: '',
    summary: '',
    profiles: [
      {
        network: 'linkedin',
        username: 'aretecode',
        url: 'https://www.linkedin.com/in/james-wiens/',
      },
    ],
    address: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    resumeWebsite: '',
    skills: ['skill1'],
  },
  work: [
    {
      id: 'open-source',
      company: 'Open Source',
      position: '',
      website: 'https://github.com/aretecode',
      startDate: '01/02/2013',
      endDate: 'current',
      summary: '',
      highlights: '',
      image: {
        title: 'eh',
        url: nonApollo.workSummaryPicture,
        width: 100,
        height: 100,
        srcSizes: [['', '', 0, 0]],
      },
    },
  ],
  openSource: {
    description: '',
    name: '',
    codeRepository: '',
    url: '',
    keywords: '',
    datePublished: '',
    dateCreated: '',
    creator: {} as any,
    image: {
      title: 'eh',
      url: '',
      width: 0,
      height: 0,
      srcSizes: [['', '', 0, 0]],
    },
  },
}
