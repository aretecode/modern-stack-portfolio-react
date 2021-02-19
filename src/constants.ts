export const defaultApolloStatePortfolio = {
  __typename: 'Resume',
  basics: {
    __typename: 'Basics',
    name: '',
    label: '',
    picture: '',
    email: 'james@jameswiens.com',
    telephone: '12506509455',
    website: '',
    summary: '',
    profiles: [
      {
        __typename: 'Profile',
        network: 'linkedin',
        username: 'aretecode',
        url: 'https://www.linkedin.com/in/james-wiens/',
      },
    ],
    address: '',
    postalCode: '',
    city: '',
    countryCode: '',
    region: '',
    resumeWebsite: '',
    skills: ['skill1'],
  },
  work: [
    {
      __typename: 'Work',
      company: 'Open Source',
      position: '',
      website: 'https://github.com/aretecode',
      startDate: '01/02/2013',
      endDate: 'current',
      summary: '',
      highlights: '',
      picture:
        'https://user-images.githubusercontent.com/4022631/55686780-04f0f980-5983-11e9-8152-204681b0840f.png',
    },
  ],
} as const
