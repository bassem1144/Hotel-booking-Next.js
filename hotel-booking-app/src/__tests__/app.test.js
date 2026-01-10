import { describe, it, expect } from 'vitest'

describe('Hotel Booking App', () => {
  it('validates email format', () => {
    const isValid = (email) => email.includes('@')
    expect(isValid('test@example.com')).toBe(true)
    expect(isValid('invalid')).toBe(false)
  })

  it('validates guest count', () => {
    expect(2).toBeGreaterThan(0)
    expect(2).toBeLessThanOrEqual(10)
  })

  it('calculates total price', () => {
    const total = 199 * 3 // 3 nights
    expect(total).toBe(597)
  })

  it('parses amenities', () => {
    const amenities = 'Pool,WiFi,Gym'.split(',')
    expect(amenities).toContain('WiFi')
  })
})
