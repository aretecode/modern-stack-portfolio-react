import * as React from 'react'
import {
  PortfolioContext,
  PortfolioContextType,
} from '../../src/features/PortfolioContext'

export class Address extends React.PureComponent {
  static contextType = PortfolioContext
  readonly context: PortfolioContextType

  render() {
    const {
      address,
      postalCode,
      city,
      countryCode,
      region,
    } = this.context.basics

    return (
      <address>
        {address}, {postalCode}, {city}, {region}, {countryCode}
      </address>
    )
  }
}
