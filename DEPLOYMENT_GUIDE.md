# 🚀 Complete Deployment & Setup Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Authentication Setup](#authentication-setup)
4. [Deployment to Production](#deployment-to-production)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites Check
```bash
# Check Node.js version (should be >= 18.17.0)
node --version

# Check npm version (should be >= 9.0.0)
npm --version

# Check Git
git --version
```

### Step 1: Clone Repository
```bash
git clone https://github.com/pranav-paygude/phadtare-coaching-platform.git
cd phadtare-coaching-platform
```

### Step 2: Install Dependencies
```bash
# Using npm
npm install

# or using pnpm (faster)
pnpm install

# or using yarn
yarn install
```

### Step 3: Setup Environment Variables
```bash
# Copy example environment file
cp .env.example .env.local

# Edit environment variables
nano .env.local
# or
code .env.local
```

### Step 4: Generate NextAuth Secret
```bash
# Generate a secure random secret
openssl rand -base64 32

# Copy the output to NEXTAUTH_SECRET in .env.local
```

### Step 5: Start Development Server
```bash
npm run dev

# Server will start at http://localhost:3000
```

---

## Database Setup

### Option A: Supabase (PostgreSQL - Recommended)

#### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Select organization and database password
- Wait for project to initialize

#### 2. Get Connection Credentials
```
In Supabase Dashboard:
- Project Settings > API
- Copy Project URL → SUPABASE_URL
- Copy Anon Key → SUPABASE_ANON_KEY
- Copy Service Key → SUPABASE_SERVICE_KEY
```

#### 3. Create Tables

Run the following SQL in Supabase SQL Editor:

```sql
-- Users Table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students Table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  class_id UUID,
  parent_id UUID REFERENCES public.users(id),
  date_of_birth DATE,
  address TEXT,
  emergency_contact VARCHAR(20),
  admission_date DATE DEFAULT CURRENT_DATE,
  fees_amount DECIMAL(10, 2) DEFAULT 0,
  fees_paid DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers Table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  specialization VARCHAR(100),
  qualification VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes Table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  teacher_id UUID REFERENCES public.teachers(id),
  batch_year VARCHAR(20),
  total_students INTEGER DEFAULT 0,
  schedule TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update students table with class constraint
ALTER TABLE public.students
ADD CONSTRAINT fk_students_class
FOREIGN KEY (class_id) REFERENCES public.classes(id);

-- Attendance Table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id),
  date DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'absent',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- Subjects Table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marks Table
CREATE TABLE public.marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id),
  test_name VARCHAR(100),
  marks_obtained DECIMAL(5, 2),
  total_marks DECIMAL(5, 2),
  percentage DECIMAL(5, 2),
  test_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents Table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  file_name VARCHAR(255),
  file_url TEXT,
  file_type VARCHAR(50),
  uploaded_by UUID REFERENCES public.users(id),
  category VARCHAR(50),
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  message TEXT,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parent Meetings Table
CREATE TABLE public.parent_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id),
  parent_id UUID REFERENCES public.users(id),
  meeting_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  summary TEXT,
  strengths TEXT,
  improvements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_students_user_id ON public.students(user_id);
CREATE INDEX idx_students_class_id ON public.students(class_id);
CREATE INDEX idx_attendance_student_date ON public.attendance(student_id, date);
CREATE INDEX idx_marks_student_subject ON public.marks(student_id, subject_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id, created_at DESC);

-- Create Seeds for Admin User
INSERT INTO public.users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
  'admin@phadtare.com',
  '$2b$10$...',  -- bcrypt hash of 'PCC7075'
  'Kishor',
  'Phadtare',
  'super_admin',
  true
);
```

#### 4. Update Environment Variables
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:password@host/database
```

#### 5. Enable Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Students can view own attendance" ON public.attendance
  FOR SELECT USING (student_id = (SELECT id FROM public.students WHERE user_id = auth.uid()));
```

---

### Option B: Firebase

#### 1. Create Firebase Project
- Go to [firebase.google.com](https://firebase.google.com)
- Click "Create Project"
- Enable Firestore Database
- Enable Authentication (Email/Password + Google)

#### 2. Get Credentials
```
In Firebase Console:
- Project Settings > Service Accounts
- Generate new private key → FIREBASE_ADMIN_SDK_KEY
- Project Settings > General > Web App
- Copy config values to .env.local
```

#### 3. Setup Firestore Collections
```javascript
// In Firebase Console > Firestore Database

// Create collections:
- users/
- students/
- teachers/
- classes/
- attendance/
- marks/
- notifications/
- parent_meetings/
```

---

## Authentication Setup

### Google OAuth Setup

#### 1. Create Google Cloud Project
```bash
# Go to https://console.cloud.google.com
# Create new project
# Enable Google+ API
```

#### 2. Create OAuth 2.0 Credentials
```
In Google Cloud Console:
- Go to "Credentials"
- Create OAuth 2.0 Client ID
- Select "Web application"
- Add Authorized redirect URIs:
  - http://localhost:3000/api/auth/callback/google
  - https://yourdomain.com/api/auth/callback/google
```

#### 3. Add to Environment Variables
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Email/Password Authentication

#### Hash Admin Password
```bash
# Install bcryptjs
npm install bcryptjs

# In Node.js console
const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash('PCC7075', salt);
console.log(hash);
```

---

## Environment Configuration

### Complete .env.local Example

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Phadtare Coaching Classes
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_DESCRIPTION=Premium AI-powered coaching management ecosystem
NODE_ENV=development

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-openssl-rand-base64-32-output
NEXTAUTH_DEBUG=false
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
DATABASE_URL=postgresql://user:password@host:5432/database

# Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AI Services (OpenAI)
OPENAI_API_KEY=sk-your-openai-key

# Notifications (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_NUMBER=+1234567890

# Email Service
RESEND_API_KEY=re_your-resend-key
SENDER_EMAIL=noreply@phadtare.com

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_WHATSAPP=true

# API Configuration
API_RATE_LIMIT=100
API_RATE_LIMIT_WINDOW=15
SESSION_TIMEOUT=1800000
```

---

## Deployment to Production

### Deploy to Vercel (Recommended)

#### 1. Prepare for Deployment
```bash
# Build locally to test
npm run build

# Check for errors
npm run lint

# Type checking
npm run type-check
```

#### 2. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 3. Deploy to Vercel
```bash
# Option 1: Using Vercel CLI
npm i -g vercel
vercel login
vercel

# Option 2: Using Vercel Dashboard
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import GitHub repo
# 4. Configure project settings
# 5. Click "Deploy"
```

#### 4. Add Environment Variables in Vercel
```
In Vercel Dashboard > Settings > Environment Variables:

Add all variables from .env.local
- NEXTAUTH_SECRET (use new one for production)
- SUPABASE_URL
- SUPABASE_ANON_KEY
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- CLOUDINARY_CLOUD_NAME
- OPENAI_API_KEY
etc.
```

#### 5. Update Callback URLs
```
In authentication services:
- Google OAuth: Add https://yourdomain.com/api/auth/callback/google
- NextAuth: Update NEXTAUTH_URL=https://yourdomain.com
- Cloudinary: Update allowed domains
```

#### 6. Deploy
```bash
# The deployment will start automatically
# Monitor in Vercel Dashboard
```

### Alternative: Deploy to AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Deploy
amplify publish
```

### Alternative: Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

---

## Performance Optimization Checklist

- [ ] Enable Gzip compression
- [ ] Setup CDN for static assets
- [ ] Enable database indexing
- [ ] Setup caching headers
- [ ] Enable image optimization
- [ ] Implement lazy loading
- [ ] Setup monitoring (Sentry)
- [ ] Enable analytics (Google Analytics)
- [ ] Setup alerts for errors
- [ ] Implement rate limiting

---

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Setup CORS properly
- [ ] Enable RLS on database
- [ ] Validate all inputs
- [ ] Sanitize outputs
- [ ] Use secure cookies
- [ ] Implement rate limiting
- [ ] Setup WAF rules
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Troubleshooting

### Issue: "NEXTAUTH_SECRET is not set"
**Solution:**
```bash
openssl rand -base64 32
# Copy output to NEXTAUTH_SECRET in .env.local
```

### Issue: "Supabase connection refused"
**Solution:**
```bash
# Check Supabase URL
# Verify SUPABASE_ANON_KEY
# Check database is running
# Verify network connectivity
```

### Issue: "Google OAuth not working"
**Solution:**
```
1. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
2. Verify authorized redirect URIs in Google Cloud Console
3. Ensure NEXTAUTH_URL matches domain
4. Clear browser cookies and try again
```

### Issue: "Cannot connect to database"
**Solution:**
```bash
# Verify DATABASE_URL is correct
# Check PostgreSQL is running
# Verify database credentials
# Check firewall rules
```

### Issue: "Build fails with TypeScript errors"
**Solution:**
```bash
npm run type-check
# Fix errors shown
npm run build
```

---

## Monitoring & Maintenance

### Setup Monitoring
```bash
# Install Sentry for error tracking
npm install @sentry/nextjs

# Install monitoring tools
npm install @vercel/analytics
```

### Regular Maintenance
```bash
# Update dependencies
npm update

# Audit security
npm audit

# Run tests
npm test

# Check performance
npm run analyze
```

---

## Scaling Considerations

1. **Database**: Use read replicas for scaling
2. **Cache**: Implement Redis for caching
3. **CDN**: Use Cloudflare for content delivery
4. **Search**: Implement Elasticsearch for advanced search
5. **Queue**: Use Bull or RabbitMQ for background jobs

---

## Support

For issues or questions:
- Check GitHub Issues
- Review documentation
- Contact: contact@phadtare.com
- WhatsApp: +91-XXXXXXXXXX

---

**Happy Deploying!** 🚀
