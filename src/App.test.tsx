import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { OFFICIAL_EGYPT_URL, REFERRAL_URL } from './content'

describe('Outlier Egypt guide', () => {
  it('renders the core journey and review date', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /من أول ضغطة/ })).toBeInTheDocument()
    expect(screen.getAllByText(/17 يوليو 2026/).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /عشر محطات/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /اقبل الدعوة الصحيحة/ })).toBeInTheDocument()
  })

  it('uses the referral and official Egypt URLs', () => {
    render(<App />)
    const referralLinks = screen.getAllByRole('link', { name: /الإحالة|سجّل الآن/ })
    expect(referralLinks.some((link) => link.getAttribute('href') === REFERRAL_URL)).toBe(true)
    const officialLinks = screen.getAllByRole('link', { name: /فرصة مصر/ })
    expect(officialLinks.some((link) => link.getAttribute('href') === OFFICIAL_EGYPT_URL)).toBe(true)
  })

  it('contains the major fact-check distinctions', () => {
    render(<App />)
    expect(screen.getAllByText('من واقع التجربة في مصر').length).toBeGreaterThan(0)
    expect(screen.getAllByText('يختلف حسب المشروع').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/المعالجة الرسمية يوم الثلاثاء/).length).toBeGreaterThan(0)
  })

  it('walks through the detailed flow to the QA stage', () => {
    render(<App />)
    const qaButtons = screen.getAllByRole('button', { name: /10.*QA وما بعده/ })
    fireEvent.click(qaButtons[qaButtons.length - 1])
    expect(screen.getByRole('heading', { name: /اقرأ المراجعة كخريطة/ })).toBeInTheDocument()
    expect(screen.getByText(/Account Audit/)).toBeInTheDocument()
  })
})
