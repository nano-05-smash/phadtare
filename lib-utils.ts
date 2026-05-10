// lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, differenceInDays } from "date-fns";

/**
 * Combines clsx and tailwind-merge for className management
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, formatStr: string = "MMM dd, yyyy"): string {
  try {
    const d = typeof date === "string" ? parseISO(date) : date;
    return format(d, formatStr);
  } catch {
    return "Invalid date";
  }
}

/**
 * Format date to time
 */
export function formatTime(date: Date | string, formatStr: string = "HH:mm"): string {
  try {
    const d = typeof date === "string" ? parseISO(date) : date;
    return format(d, formatStr);
  } catch {
    return "Invalid time";
  }
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string, formatStr: string = "MMM dd, yyyy HH:mm"): string {
  try {
    const d = typeof date === "string" ? parseISO(date) : date;
    return format(d, formatStr);
  } catch {
    return "Invalid date";
  }
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  try {
    const d = typeof date === "string" ? parseISO(date) : date;
    const days = differenceInDays(new Date(), d);

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  } catch {
    return "Unknown";
  }
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format large numbers (e.g., 1000 -> 1k)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

/**
 * Calculate percentage
 */
export function calculatePercentage(obtained: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((obtained / total) * 100 * 100) / 100;
}

/**
 * Calculate attendance percentage
 */
export function calculateAttendancePercentage(present: number, total: number): number {
  return calculatePercentage(present, total);
}

/**
 * Get grade based on percentage
 */
export function getGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

/**
 * Get grade color
 */
export function getGradeColor(grade: string): string {
  const gradeColors: Record<string, string> = {
    "A+": "text-success-600",
    "A": "text-success-500",
    "B+": "text-primary-600",
    "B": "text-primary-500",
    "C": "text-warning-600",
    "D": "text-warning-500",
    "F": "text-danger-600",
  };
  return gradeColors[grade] || "text-neutral-600";
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Capitalize string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize words
 */
export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Generate random color
 */
export function generateRandomColor(): string {
  const colors = [
    "#0066FF",
    "#00D9FF",
    "#FF006E",
    "#00B88A",
    "#FFA500",
    "#FF3333",
    "#9D4EDD",
    "#3A86FF",
    "#FB5607",
    "#FFBE0B",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout;
  let lastRun = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => func(...args), limit - (now - lastRun));
    }
  };
}

/**
 * Delay execution
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge objects
 */
export function mergeObjects<T extends Record<string, any>>(obj1: T, obj2: Partial<T>): T {
  return { ...obj1, ...obj2 };
}

/**
 * Group array by key
 */
export function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((acc, obj) => {
    const groupKey = obj[key] as string;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(obj);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Sort array by property
 */
export function sortBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Filter array by multiple conditions
 */
export function filterBy<T extends Record<string, any>>(
  array: T[],
  filters: Record<string, any>
): T[] {
  return array.filter((item) =>
    Object.entries(filters).every(([key, value]) => item[key] === value)
  );
}

/**
 * Get unique values from array
 */
export function getUnique<T extends Record<string, any>>(array: T[], key?: keyof T): T[] {
  if (!key) {
    return [...new Set(array)];
  }
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Flatten array
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce<T[]>((acc, val) => acc.concat(val), []);
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Get CSV headers from array
 */
export function getCSVHeaders<T extends Record<string, any>>(array: T[]): string[] {
  if (array.length === 0) return [];
  return Object.keys(array[0]);
}

/**
 * Convert array to CSV
 */
export function arrayToCSV<T extends Record<string, any>>(array: T[]): string {
  const headers = getCSVHeaders(array);
  const csv = [
    headers.join(","),
    ...array.map((obj) =>
      headers.map((header) => {
        const value = obj[header];
        if (typeof value === "string" && value.includes(",")) {
          return `"${value}"`;
        }
        return value;
      })
    ),
  ].join("\n");
  return csv;
}

/**
 * Sleep/delay function
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get initials from name
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName?.charAt(0).toUpperCase() || "";
  return first + last;
}

/**
 * Get avatar background color based on name
 */
export function getAvatarColor(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

/**
 * Download file
 */
export function downloadFile(url: string, fileName: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get file extension
 */
export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop() || "";
}

/**
 * Get file size in readable format
 */
export function getFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Check if object is empty
 */
export function isEmpty<T extends Record<string, any>>(obj: T): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Check if value is null or undefined
 */
export function isNullish(value: any): boolean {
  return value === null || value === undefined;
}
