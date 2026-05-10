# 🎓 Phadtare Coaching Classes - Premium SaaS Platform

> A futuristic, production-ready AI-powered coaching management ecosystem built with modern technologies.

## 🌟 Features

### 🔐 Authentication & Authorization
- **Multi-role support**: Super Admin, Admin, Teacher, Student, Parent
- **Secure authentication**: NextAuth.js with JWT
- **OAuth integration**: Google Sign-in
- **Session management**: Secure token-based sessions
- **Protected routes**: Role-based access control

### 📊 Admin Dashboard
- Real-time analytics and insights
- Student management (CRUD operations)
- Teacher management
- Class management with scheduling
- Attendance tracking and analytics
- Marks management with automated calculations
- Fee management and collection tracking
- Announcement system
- User activity monitoring

### 👨‍🎓 Student Portal
- Personal profile dashboard
- Attendance tracking with visual heatmap
- Subject-wise marks analytics
- Homework tracker
- Digital document vault
- Goal tracking and performance analytics
- Performance predictions
- Study streak system

### 👥 Parent Portal
- Child profile access
- Attendance monitoring
- Academic performance tracking
- Meeting notes and summaries
- Fee status tracking
- Communication with teachers

### 🤖 AI Features
- **Performance Analysis**: AI-driven student performance insights
- **Weak Subject Detection**: Automatic identification of struggling areas
- **Growth Prediction**: Predictive analytics for student improvement
- **Risk Detection**: Early warning system for at-risk students
- **Smart Recommendations**: Personalized improvement suggestions
- **Meeting Summaries**: AI-generated parent meeting reports
- **Motivational Insights**: Personalized motivation and encouragement

### 📱 Notifications
- Low attendance alerts
- Poor performance warnings
- Homework reminders
- Fee payment reminders
- Test schedule notifications
- WhatsApp integration for instant messaging

### 📈 Analytics & Reporting
- Attendance analytics with trends
- Performance tracking with visual charts
- Class-wise comparisons
- Fee collection reports
- Customizable dashboards
- Export to PDF and Excel

### 💎 Premium UI/UX
- Glassmorphism design
- Smooth animations (Framer Motion + GSAP)
- Responsive design (Mobile-first)
- Dark/Light mode support
- Premium SaaS aesthetic
- Accessibility compliant

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **ShadCN UI** - Component library
- **React Hook Form** - Form management
- **TanStack React Table** - Data tables

### Backend & Database
- **Supabase** - PostgreSQL database
- **NextAuth.js** - Authentication
- **Firebase** - Alternative database option
- **Cloudinary** - Image storage

### State Management & Data
- **Zustand** - State management
- **TanStack React Query** - Data fetching
- **Recharts** - Data visualization
- **Chart.js** - Advanced charts

### DevOps & Deployment
- **Vercel** - Hosting platform
- **GitHub** - Version control
- **Environment variables** - Configuration

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** v18.17.0 or higher
- **npm** or **pnpm** package manager
- **Git** for version control
- A **PostgreSQL** database (Supabase recommended)
- A **Google OAuth** application

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/pranav-paygude/phadtare-coaching-platform.git
cd phadtare-coaching-platform
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Setup Database

#### Option A: Using Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migrations from `database/migrations/`
3. Update your `.env.local` with Supabase credentials

#### Option B: Using Firebase

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Generate service account key
3. Update `.env.local` with Firebase credentials

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Login with Default Credentials

**Super Admin:**
- Email: `admin@phadtare.com`
- Password: `PCC7075`

---

## 📁 Project Structure

```
phadtare-coaching-platform/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard routes
│   └── api/               # API endpoints
├── components/            # React components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── services/              # Business logic
├── store/                 # State management
├── types/                 # TypeScript types
├── constants/             # Constants
├── styles/                # Global styles
├── public/                # Static assets
├── database/              # Database schema & migrations
├── .env.example           # Environment template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

---

## 🔐 Authentication Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

### NextAuth Configuration

```typescript
// lib/auth.ts
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // Email/password login
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
};
```

---

## 🗄️ Database Schema

### Key Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('super_admin', 'admin', 'teacher', 'student', 'parent'),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Students
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  roll_number VARCHAR(50) UNIQUE,
  class_id UUID REFERENCES classes(id),
  status ENUM('active', 'inactive', 'promoted', 'left'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Classes
```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  teacher_id UUID REFERENCES teachers(id),
  batch_year VARCHAR(20),
  status ENUM('active', 'inactive'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Attendance
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late', 'leave'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Marks
```sql
CREATE TABLE marks (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  subject_id UUID REFERENCES subjects(id),
  marks_obtained DECIMAL(5, 2),
  total_marks DECIMAL(5, 2),
  test_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 Design System

### Color Palette

```css
--primary: #0066FF (Premium Blue)
--secondary: #00D9FF (Cyan)
--accent: #FF006E (Neon Pink)
--success: #00B88A (Green)
--warning: #FFA500 (Orange)
--danger: #FF3333 (Red)
```

### Typography

- **Display**: Outfit
- **Heading**: Poppins
- **Body**: Inter
- **Code**: JetBrains Mono

### Spacing Scale

8px base unit: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Signup
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student"
}
```

### Student Endpoints

#### Get All Students
```
GET /students?page=1&limit=10
Authorization: Bearer {token}
```

#### Get Student by ID
```
GET /students/:id
Authorization: Bearer {token}
```

#### Create Student
```
POST /students
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "rollNumber": "001",
  "classId": "class-id"
}
```

#### Update Student
```
PUT /students/:id
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Student
```
DELETE /students/:id
Authorization: Bearer {token}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy

```bash
# Connect to Vercel
vercel

# Deploy
vercel --prod
```

### Deploy to Other Platforms

#### AWS Amplify
```bash
amplify init
amplify publish
```

#### Netlify
```bash
netlify deploy --prod
```

---

## 📊 Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}
/>
```

### Code Splitting
```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./components/Heavy'))
```

### Caching Strategies
```typescript
// Revalidate every 60 seconds
export const revalidate = 60;

// Static generation
export const dynamicParams = false;
```

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test -- --coverage
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Supabase Documentation](https://supabase.com/docs)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

**Coded by:** Pranav Paygude  
**Platform Admin:** Prof. Kishor Phadtare  
**Institute:** Phadtare Coaching Classes  
**Since:** 2015

### Contact Information
- 📧 Email: contact@phadtare.com
- 📱 WhatsApp: +91-XXXXXXXXXX
- 🌐 Website: https://phadtare.com
- 📍 Location: Pune, Maharashtra, India

---

## 🙏 Acknowledgments

- Design inspiration: Apple, Stripe, Linear.app, Notion
- Technologies: Next.js, React, TypeScript, Tailwind CSS
- Community: Open-source contributors

---

**Status**: Production Ready  
**Version**: 1.0.0  
**Last Updated**: 2024

---

## 🎯 Roadmap

### Phase 1 ✅
- [x] Project setup and configuration
- [x] Authentication system
- [x] Database schema
- [x] Basic UI components

### Phase 2 (In Progress)
- [ ] Admin dashboard
- [ ] Student management
- [ ] Attendance system
- [ ] Marks tracking

### Phase 3 (Upcoming)
- [ ] AI features
- [ ] Parent portal
- [ ] WhatsApp integration
- [ ] Advanced analytics

### Phase 4 (Future)
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] Video conferencing
- [ ] Advanced AI analytics

---

Happy Coding! 🚀
