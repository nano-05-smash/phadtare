# 🏗️ Component Architecture & Build Roadmap

## Component Hierarchy

```
App (Root)
├── Layout (Global)
│   ├── Header/Navbar
│   ├── Sidebar (Dashboard only)
│   ├── Main Content
│   └── Footer
├── Pages
│   ├── Landing Page
│   ├── Auth Pages
│   ├── Dashboard Pages
│   └── User Portals
└── Modals/Overlays
    ├── Form Modals
    ├── Confirmation Dialogs
    └── Notifications
```

---

## Core Components to Build

### Phase 1: Foundation Components (Week 1)

#### Layout Components
```typescript
components/layout/
├── Navbar.tsx
│   - Logo + branding
│   - Navigation links
│   - Dark/light mode toggle
│   - User profile dropdown
│   - Sticky header
│
├── Sidebar.tsx
│   - Navigation menu
│   - Collapsible sections
│   - Active indicators
│   - Animated transitions
│   - Icons with labels
│
├── Footer.tsx
│   - Credits: "Coded by Pranav Paygude"
│   - Admin info: "Prof. Kishor Phadtare"
│   - Since: "2015"
│   - Links and social
│
└── DashboardLayout.tsx
    - Combines Navbar + Sidebar
    - Main content area
    - Responsive grid layout
```

#### UI Primitives
```typescript
components/common/
├── Button.tsx
│   - Variants: solid, ghost, outline
│   - Sizes: sm, md, lg
│   - Loading states
│   - Disabled states
│   - Icons support
│
├── Card.tsx
│   - Base card component
│   - Glassmorphism effect
│   - Hover animations
│   - Shadow variants
│
├── Badge.tsx
│   - Status indicators
│   - Color variants
│   - Sizes
│
├── Modal.tsx
│   - Reusable modal wrapper
│   - Smooth transitions
│   - Close button
│   - Backdrop blur
│
├── Loading.tsx
│   - Skeleton loaders
│   - Animated spinners
│   - Progress bars
│
├── Toast.tsx
│   - Notifications
│   - Success/error/warning
│   - Auto-dismiss
│   - Stack management
│
└── Input.tsx
    - Text input
    - Select dropdown
    - Checkbox/Radio
    - Date picker
    - Error states
```

---

### Phase 2: Dashboard Components (Week 2-3)

#### Dashboard Stats
```typescript
components/dashboard/
├── StatCard.tsx
│   - Title
│   - Value
│   - Subtitle
│   - Icon/badge
│   - Trend indicator (↑↓)
│   - Click action
│
├── AnalyticsGrid.tsx
│   - Responsive grid
│   - Multiple stat cards
│   - Loading states
│
├── RecentActivity.tsx
│   - Activity list
│   - Timestamps
│   - Action types
│   - User info
│
├── QuickActions.tsx
│   - Action buttons
│   - Icons
│   - Grid layout
│
└── NotificationCenter.tsx
    - Bell icon with badge
    - Dropdown panel
    - Notification list
    - Mark as read
```

#### Data Tables
```typescript
components/tables/
├── StudentTable.tsx
│   - Column headers
│   - Row selection
│   - Sorting
│   - Pagination
│   - Actions menu (Edit/Delete)
│
├── AttendanceTable.tsx
│   - Date columns
│   - Status colors
│   - Bulk actions
│
├── MarksTable.tsx
│   - Subject columns
│   - Percentage/Grade
│   - Trend indicators
│
└── DataTable.tsx
    - Generic table wrapper
    - Uses TanStack Table
    - Filtering
    - Searching
```

#### Charts
```typescript
components/charts/
├── AttendanceChart.tsx
│   - Bar chart (Recharts)
│   - Weekly/Monthly view
│   - Legend
│   - Tooltip
│
├── MarksChart.tsx
│   - Line chart
│   - Trend analysis
│   - Multiple subjects
│
├── PerformanceChart.tsx
│   - Radar chart
│   - Multi-dimensional
│
└── AnalyticsCharts.tsx
    - Grid of multiple charts
    - Responsive design
    - Loading states
```

---

### Phase 3: Student Components (Week 4-5)

#### Student Profile
```typescript
components/students/
├── StudentCard.tsx
│   - Avatar
│   - Name + roll number
│   - Class
│   - Status badge
│   - Click to view details
│
├── StudentProfile.tsx
│   - Full profile view
│   - Avatar upload area
│   - Personal info
│   - Contact details
│   - Edit button
│
├── StudentTable.tsx
│   - List of students
│   - Sortable columns
│   - Searchable
│   - Actionable rows
│
├── StudentModal.tsx
│   - Form for add/edit
│   - Validation
│   - File uploads
│   - Success toast
│
└── StudentGallery.tsx
    - Grid view of students
    - Cards layout
    - Quick info on hover
```

#### Student Analytics
```typescript
components/analytics/
├── AttendanceHeatmap.tsx
│   - Calendar heatmap
│   - Color intensity
│   - Tooltip details
│   - Monthly/yearly view
│
├── PerformanceTrend.tsx
│   - Line chart
│   - Historical data
│   - Grade color coding
│
├── RankingCard.tsx
│   - Current rank
│   - Class total
│   - Trend indicator
│   - Medal/badge
│
└── GoalTracker.tsx
    - Target percentage
    - Current progress
    - Days remaining
    - Motivational message
```

---

### Phase 4: Advanced Components (Week 6-7)

#### AI Components
```typescript
components/ai/
├── InsightWidget.tsx
│   - AI-generated insight card
│   - Animated text reveal
│   - Icon indicator
│   - Learn more link
│
├── PredictionCard.tsx
│   - Grade prediction
│   - Confidence percentage
│   - Factors listed
│   - Recommendations
│
├── AIChat.tsx
│   - Chat interface
│   - Message bubbles
│   - Loading states
│   - Quick actions
│
└── PerformanceSummary.tsx
    - AI-generated summary
    - Strengths/weaknesses
    - Actionable steps
```

#### Parent Meeting Mode
```typescript
components/meetings/
├── MeetingPresentation.tsx
│   - Fullscreen mode
│   - Slide controls
│   - Large charts
│   - Clean layout
│
├── PerformanceSlide.tsx
│   - Student info
│   - Marks overview
│   - Attendance
│
├── StrengthsSlide.tsx
│   - Bullet points
│   - Visual emphasis
│   - Achievement badges
│
├── ImprovementSlide.tsx
│   - Areas to improve
│   - Recommendations
│   - Resources
│
└── SummaryPrintable.tsx
    - Printable version
    - Professional layout
    - All key info
```

---

## Detailed Component Examples

### Example 1: StatCard Component

```typescript
// components/dashboard/StatCard.tsx

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: {
    color: string;
    value: string;
  };
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  trend,
  onClick,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -4 }}
      onClick={onClick}
      className="bg-white/40 backdrop-blur-xl rounded-xl p-6 border border-white/20 cursor-pointer hover:border-primary-200 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-neutral-900 mt-2">{value}</h3>
          {subtitle && (
            <p className="text-neutral-500 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {icon && <div className="text-primary-600">{icon}</div>}
          {badge && (
            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${badge.color}`}>
              {badge.value}
            </span>
          )}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <TrendIcon direction={trend.direction} />
          <span className={`text-xs font-semibold ${trend.direction === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
            {trend.percentage.toFixed(1)}%
          </span>
        </div>
      )}
    </motion.div>
  );
}
```

### Example 2: Student Table Component

```typescript
// components/students/StudentTable.tsx

import { useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Student } from '@/types';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
  isLoading?: boolean;
}

export function StudentTable({
  students,
  onEdit,
  onDelete,
  isLoading,
}: StudentTableProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const columns = [
    {
      accessorKey: 'user.firstName',
      header: 'Name',
      cell: ({ getValue, row }) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.original.user.firstName} />
          <span>{getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: 'rollNumber',
      header: 'Roll Number',
    },
    {
      accessorKey: 'class.name',
      header: 'Class',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => (
        <StatusBadge status={getValue()} />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <ActionMenu
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original.id)}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-neutral-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-left text-sm font-semibold">
                  {header.isPlaceholder ? null : (
                    header.column.columnDef.header
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-neutral-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-3">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Build Timeline

### Week 1-2: Foundation
- [ ] Setup Next.js project
- [ ] Configure Tailwind & TypeScript
- [ ] Create layout components
- [ ] Create UI primitives
- [ ] Setup authentication

### Week 3-4: Dashboard
- [ ] Dashboard layout
- [ ] Analytics cards
- [ ] Basic charts
- [ ] Data tables
- [ ] CRUD operations

### Week 5-6: Student Portal
- [ ] Student profile
- [ ] Attendance tracking
- [ ] Marks analytics
- [ ] Document vault
- [ ] Performance dashboard

### Week 7-8: Advanced Features
- [ ] AI integration
- [ ] Parent meeting mode
- [ ] Notifications system
- [ ] WhatsApp integration
- [ ] Export features

### Week 9-10: Polish & Deploy
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Testing & QA
- [ ] Security audit
- [ ] Production deployment

---

## Key Development Patterns

### Pattern 1: Reusable Card Component

```typescript
// components/common/Card.tsx
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
};

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all',
        {
          'bg-white/40 backdrop-blur-xl border border-white/20': variant === 'default',
          'bg-white shadow-lg': variant === 'elevated',
          'border border-neutral-200': variant === 'outlined',
        },
        className
      )}
      {...props}
    />
  );
}
```

### Pattern 2: Data Fetching Hook

```typescript
// hooks/useStudents.ts
import { useState, useEffect } from 'react';
import { Student } from '@/types';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { students, loading, error, refetch: fetchStudents };
}
```

### Pattern 3: Form Component

```typescript
// components/students/StudentForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentFormSchema } from '@/lib/schemas';

type StudentFormData = z.infer<typeof StudentFormSchema>;

export function StudentForm({ onSubmit }: { onSubmit: (data: StudentFormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(StudentFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="First Name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      {/* More fields... */}
      <Button type="submit">Save Student</Button>
    </form>
  );
}
```

---

## Component Inventory

### Total Components to Build: ~50

| Category | Count | Examples |
|----------|-------|----------|
| Layout | 4 | Navbar, Sidebar, Footer, DashboardLayout |
| Common | 10 | Button, Card, Badge, Modal, Input, Loading |
| Dashboard | 8 | StatCard, Chart, RecentActivity, Notifications |
| Tables | 4 | StudentTable, AttendanceTable, MarksTable |
| Students | 6 | StudentCard, StudentProfile, StudentForm |
| Analytics | 8 | Charts, Heatmap, Trend, Summary |
| AI | 4 | InsightWidget, Prediction, Chat, Summary |
| Meetings | 5 | Presentation, Slides, Printable |
| Forms | 8 | Login, Signup, Student, Class, etc. |
| **TOTAL** | **~50** | **Modular & Reusable** |

---

## Performance Considerations

### Lazy Loading Strategy
```typescript
// Load heavy components on demand
const ParentMeetingMode = dynamic(
  () => import('@/components/meetings/ParentMeetingMode'),
  { loading: () => <LoadingSkeleton /> }
);
```

### Image Optimization
```typescript
// Always use Next.js Image component
<Image
  src="/student-photo.jpg"
  alt="Student name"
  width={400}
  height={300}
  priority={false} // Only use priority for LCP
/>
```

### Code Splitting
```typescript
// Separate data from presentation
// Fetch in parent, pass as props
// Prevent re-renders with useMemo
```

---

## Next Steps

1. **Start with Layout Components** - Build Navbar, Sidebar, Footer
2. **Create UI Primitives** - Button, Card, Input, Modal
3. **Build Dashboard** - Stats cards, charts, tables
4. **Implement Authentication** - Login, signup flows
5. **Create Student Portal** - Profiles, analytics, vault
6. **Add Advanced Features** - AI, notifications, exports

---

**Remember**: Start simple, iterate, and add complexity gradually!
