import express from 'express'
import cors from 'cors'
import registrationRoutes from './routes.js'
import { connectDB } from './db.js'

const app = express()
const PORT = process.env.PORT || 5000

// Initialize MongoDB
connectDB()

// ─── Middleware ────────────────────────────────
app.use(cors())
app.use(express.json())

// Request logger
app.use((req, _res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`  → ${req.method} ${req.url}`)
  }
  next()
})

// ─── Routes ───────────────────────────────────
app.use('/api/registrations', registrationRoutes)

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'THE LAST COMMIT — API Server',
    status: 'running',
    endpoints: [
      'GET  /api/health',
      'POST /api/registrations',
      'GET  /api/registrations',
      'GET  /api/registrations/stats',
      'GET  /api/registrations/:id',
    ],
  })
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})




app.listen(PORT, () => {
  console.log('')
  console.log('  ╔══════════════════════════════════════╗')
  console.log('  ║   THE LAST COMMIT — Backend Server   ║')
  console.log('  ╠══════════════════════════════════════╣')
  console.log(`  ║   Running on http://localhost:${PORT}    ║`)
  console.log('  ║   Press Ctrl+C to stop               ║')
  console.log('  ╚══════════════════════════════════════╝')
  console.log('')
})
