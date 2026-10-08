import mongoose, { Document, Schema } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/last-commit'

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('  ✓ Connected to MongoDB')
  } catch (error) {
    console.error('  ✗ MongoDB connection error:', error)
  }
}

export interface Registration {
  registrationId: string
  commitHash: string
  name: string
  email: string
  phone: string
  college: string
  year: string
  department: string
  github: string
  linkedin: string
  portfolio: string
  teamName: string
  teamSize: string
  teamMembers: string
  track: string
  status: string
  createdAt?: string
}

export interface RegistrationDocument extends Registration, Document {}

const registrationSchema = new Schema<RegistrationDocument>(
  {
    registrationId: { type: String, required: true, unique: true },
    commitHash: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    teamName: { type: String, required: true },
    teamSize: { type: String, default: '2' },
    teamMembers: { type: String, default: '' },
    track: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

const RegistrationModel = mongoose.model<RegistrationDocument>('Registration', registrationSchema)

export async function getAllRegistrations(): Promise<Registration[]> {
  return RegistrationModel.find().lean()
}

export async function getRegistrationById(registrationId: string): Promise<Registration | null> {
  return RegistrationModel.findOne({ registrationId }).lean()
}

export async function getRegistrationByEmail(email: string): Promise<Registration | null> {
  return RegistrationModel.findOne({ email: email.toLowerCase() }).lean()
}

export async function addRegistration(reg: Omit<Registration, 'id' | 'createdAt'>): Promise<Registration> {
  const newReg = new RegistrationModel(reg)
  await newReg.save()
  return newReg.toObject()
}

export async function getStats() {
  const registrations = await RegistrationModel.find().lean()
  const byTrack: Record<string, number> = {}
  const byStatus: Record<string, number> = {}

  for (const r of registrations) {
    byTrack[r.track] = (byTrack[r.track] || 0) + 1
    byStatus[r.status] = (byStatus[r.status] || 0) + 1
  }

  return {
    total: registrations.length,
    byTrack: Object.entries(byTrack).map(([track, count]) => ({ track, count })),
    byStatus: Object.entries(byStatus).map(([status, count]) => ({ status, count })),
  }
}
