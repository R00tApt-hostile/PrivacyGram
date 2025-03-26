import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DownloadButton from '../components/Common/DownloadButton'

describe('DownloadButton', () => {
  const mockMedia = {
    mediaUrl: 'https://example.com/image.jpg',
    mediaType: 'image'
  }

  it('Renders download button', () => {
    const { getByText } = render(<DownloadButton {...mockMedia} />)
    expect(getByText('Download')).toBeInTheDocument()
  })

  it('Shows progress when downloading', () => {
    const { getByText, rerender } = render(
      <DownloadButton {...mockMedia} isDownloading downloadProgress={45} />
    )
    expect(getByText('45%')).toBeInTheDocument()
  })
})
