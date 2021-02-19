import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'

describe('example', () => {
  it('simple react test', () => {
    const handleSubmit = (serialized: {}) => 'submitted'
    const mockSubmit = jest.fn(handleSubmit)

    const { getByText } = render(<button onClick={mockSubmit}>Continue</button>)
    expect(mockSubmit.mock.calls.length).toEqual(0)

    fireEvent.click(getByText(/Continue/))
    expect(mockSubmit.mock.calls.length).toEqual(1)
  })
})
