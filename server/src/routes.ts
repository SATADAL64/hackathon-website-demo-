import { Router, Request, Response } from 'express'
import {
  addRegistration,
  getAllRegistrations,
  getRegistrationById,
  getRegistrationByEmail,
  getStats,
} from './db.js'
import crypto from 'crypto'

const router = Router()

function generateRegistrationId(): string {
  return `TLC-${crypto.randomBytes(3).toString('hex').toUpperCase()}`
}

function generateCommitHash(): string {
  return crypto.randomBytes(4).toString('hex').substring(0, 7)
}

// ─── POST /api/registrations ───────────────────────────
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const {
    name, email, phone,
    college, year, department,
    github, linkedin, portfolio,
    teamName, teamSize, teamMembers,
    track,
  } = req.body

  // Validation
  const missing: string[] = []
  if (!name?.trim()) missing.push('name')
  if (!email?.trim()) missing.push('email')
  if (!phone?.trim()) missing.push('phone')
  if (!college?.trim()) missing.push('college')
  if (!year?.trim()) missing.push('year')
  if (!department?.trim()) missing.push('department')
  if (!teamName?.trim()) missing.push('teamName')
  if (!track?.trim()) missing.push('track')

  if (missing.length > 0) {
    res.status(400).json({ error: 'Missing required fields', fields: missing })
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email format' })
    return
  }

  // Check duplicate email
  const existing = await getRegistrationByEmail(email.trim())
  if (existing) {
    res.status(409).json({ error: 'This email is already registered' })
    return
  }

  try {
    const registrationId = generateRegistrationId()
    const commitHash = generateCommitHash()

    const registration = await addRegistration({
      registrationId,
      commitHash,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      year: year.trim(),
      department: department.trim(),
      github: (github || '').trim(),
      linkedin: (linkedin || '').trim(),
      portfolio: (portfolio || '').trim(),
      teamName: teamName.trim(),
      teamSize: teamSize || '2',
      teamMembers: (teamMembers || '').trim(),
      track: track.trim(),
      status: 'pending',
    })

    console.log(`  ✓ New registration: ${registrationId} — ${name} (${email})`)

    res.status(201).json({
      success: true,
      registrationId: registration.registrationId,
      commitHash: registration.commitHash,
      message: 'Registration successful',
    })
  } catch (err: any) {
    console.error('  ✗ Registration error:', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ─── GET /api/registrations ────────────────────────────
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const registrations = await getAllRegistrations()
    res.json({ total: registrations.length, registrations })
  } catch (err: any) {
    console.error('  ✗ Fetch error:', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ─── GET /api/registrations/stats ──────────────────────
router.get('/stats', async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json(await getStats())
  } catch (err: any) {
    console.error('  ✗ Stats error:', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ─── GET /api/registrations/:id ────────────────────────
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const registration = await getRegistrationById(req.params.id as string)
    if (!registration) {
      res.status(404).json({ error: 'Registration not found' })
      return
    }
    res.json(registration)
  } catch (err: any) {
    console.error('  ✗ Fetch error:', err.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
