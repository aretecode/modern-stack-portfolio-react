import * as React from 'react'
import { PortfolioContext } from '../../features/PortfolioContext'

export function Address() {
  const { address, postalCode, city, countryCode, region } = React.useContext(
    PortfolioContext
  ).basics

  return (
    <address>
      {address}, {postalCode}, {city}, {region}, {countryCode}
    </address>
  )
}
