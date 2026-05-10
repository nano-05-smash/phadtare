// types/index.ts

// ===================== ENUMS =====================

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
  PARENT = "parent",
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  LEAVE = "leave",
}

export enum StudentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PROMOTED = "promoted",
  LEFT = "left",
}

export enum NotificationType {
  ALERT = "alert",
  REMINDER = "reminder",
  INFO = "info",
  WARNING = "warning",
  SUCCESS = "success",
}

export enum DocumentCategory {
  REPORT_CARD = "report_card",
  HOMEWORK = "homework",
  TEST_PAPER = "test_paper",
  CERTIFICATE = "certificate",
  OTHER = "other",
}

// ===================== USER TYPES =====================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: User;
  expiresAt: string;
}

// ===================== STUDENT TYPES =====================

export interface Student {
  id: string;
  userId: string;
  user: User;
  rollNumber: string;
  classId: string;
  parentId: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  admissionDate: Date;
  feesAmount: number;
  feesPaid: number;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile extends Student {
  class?: Class;
  attendance?: AttendanceRecord[];
  marks?: Mark[];
  documents?: Document[];
  analytics?: StudentAnalytics;
}

export interface StudentAnalytics {
  attendancePercentage: number;
  averageMarks: number;
  subjectWisePerformance: Record<string, number>;
  weeklyAttendance: AttendanceData[];
  monthlyMarks: MarkData[];
  ranking: number;
  totalStudents: number;
  improvementTrend: number;
  strengths: string[];
  weaknesses: string[];
}

// ===================== TEACHER TYPES =====================

export interface Teacher {
  id: string;
  userId: string;
  user: User;
  employeeId: string;
  specialization?: string;
  qualification?: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherProfile extends Teacher {
  classes?: Class[];
  students?: Student[];
  analytics?: TeacherAnalytics;
}

export interface TeacherAnalytics {
  totalClasses: number;
  totalStudents: number;
  averageAttendance: number;
  topPerformers: Student[];
  strugglingStudents: Student[];
  classPerformance: Record<string, number>;
}

// ===================== CLASS TYPES =====================

export interface Class {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  batchYear: string;
  totalStudents: number;
  schedule?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassDetails extends Class {
  teacher?: Teacher;
  students?: Student[];
  subjects?: Subject[];
  analytics?: ClassAnalytics;
}

export interface ClassAnalytics {
  averageAttendance: number;
  averageMarks: number;
  topStudents: Student[];
  strugglingStudents: Student[];
  subjectPerformance: Record<string, number>;
  attendanceTrend: AttendanceData[];
}

// ===================== SUBJECT TYPES =====================

export interface Subject {
  id: string;
  name: string;
  code: string;
  classId: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ===================== ATTENDANCE TYPES =====================

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: Date;
  status: AttendanceStatus;
  notes?: string;
  createdAt: Date;
}

export interface AttendanceData {
  date: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  leaveCount: number;
}

// ===================== MARKS TYPES =====================

export interface Mark {
  id: string;
  studentId: string;
  subjectId: string;
  testName: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  testDate: Date;
  createdAt: Date;
}

export interface MarkData {
  month: string;
  percentage: number;
  status: "pass" | "fail" | "excellent";
}

export interface SubjectMarks {
  subjectName: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  trend: number;
}

// ===================== DOCUMENT TYPES =====================

export interface Document {
  id: string;
  studentId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedBy: string;
  category: DocumentCategory;
  size: number;
  createdAt: Date;
}

// ===================== NOTIFICATION TYPES =====================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// ===================== PARENT MEETING TYPES =====================

export interface ParentMeeting {
  id: string;
  studentId: string;
  teacherId: string;
  parentId: string;
  meetingDate: Date;
  notes: string;
  summary?: string;
  strengths?: string[];
  improvements?: string[];
  createdAt: Date;
}

export interface MeetingSummary {
  studentPerformance: string;
  strengths: string[];
  areasOfImprovement: string[];
  suggestedActions: string[];
  nextSteps: string;
}

// ===================== DASHBOARD TYPES =====================

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageAttendance: number;
  averageMarks: number;
  lowAttendanceAlerts: number;
  pendingFees: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  actor: User;
  metadata?: Record<string, any>;
}

// ===================== SEARCH & FILTER TYPES =====================

export interface SearchQuery {
  keyword: string;
  filters: Record<string, any>;
  sortBy: string;
  order: "asc" | "desc";
  page: number;
  limit: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// ===================== FEE TYPES =====================

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: "pending" | "partial" | "paid";
  month?: string;
  notes?: string;
  createdAt: Date;
}

export interface FeeAnalytics {
  totalAmount: number;
  totalCollected: number;
  pending: number;
  defaulters: Student[];
  collectionRate: number;
  monthlyCollection: Record<string, number>;
}

// ===================== API RESPONSE TYPES =====================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// ===================== FORM TYPES =====================

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  rollNumber: string;
  classId: string;
  parentId: string;
  dateOfBirth?: string;
  address?: string;
  phone?: string;
  emergencyContact?: string;
}

export interface ClassFormData {
  name: string;
  description?: string;
  teacherId: string;
  batchYear: string;
  schedule?: string;
}

// ===================== AI TYPES =====================

export interface AIInsight {
  id: string;
  studentId: string;
  type: "performance" | "prediction" | "recommendation" | "risk";
  title: string;
  content: string;
  confidence: number;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface PerformancePrediction {
  studentName: string;
  predictedGrade: string;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

// ===================== EXPORT TYPES =====================

export interface ExportOptions {
  format: "pdf" | "excel" | "csv";
  dataType: "student" | "attendance" | "marks" | "report";
  filters?: Record<string, any>;
}

export interface ExportResult {
  success: boolean;
  fileName: string;
  fileUrl: string;
  size: number;
}

// ===================== PAGINATION =====================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

// ===================== CHART DATA =====================

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}
