// Placeholder API functions - connect to n8n webhook URLs later

const WEBHOOK_BASE = "https://your-n8n-instance.com/webhook";

export interface Hospital {
  id: string;
  name: string;
  address: string;
  type: "Government" | "Clinic";
  state: string;
  area: string;
  pincode: string;
  specializations: string[];
}

export interface Doctor {
  id: string;
  name: string;
  experience: string;
  designation: string;
  specialization: string;
  consultingFee: string;
  bio: string;
  hospitalId: string;
  status: "pending" | "approved" | "rejected";
  email?: string;
  clinicName?: string;
  clinicLocation?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  problem: string;
  contact: string;
  doctorId: string;
  doctorName: string;
  slotTime: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

// Mock data
const mockHospitals: Hospital[] = [
  { id: "1", name: "Government General Hospital", address: "Main Road, Chennai", type: "Government", state: "Tamil Nadu", area: "Chennai", pincode: "600001", specializations: ["Cardiology", "Orthopedics", "General Medicine", "Pediatrics"] },
  { id: "2", name: "District Hospital", address: "MG Road, Bangalore", type: "Government", state: "Karnataka", area: "Bangalore", pincode: "560001", specializations: ["Dermatology", "General Medicine", "Orthopedics"] },
  { id: "3", name: "HealthFirst Clinic", address: "Anna Nagar, Chennai", type: "Clinic", state: "Tamil Nadu", area: "Chennai", pincode: "600040", specializations: ["Cardiology", "Pediatrics"] },
  { id: "4", name: "CareWell Medical Center", address: "Koramangala, Bangalore", type: "Clinic", state: "Karnataka", area: "Bangalore", pincode: "560034", specializations: ["Dermatology", "General Medicine"] },
];

const mockDoctors: Doctor[] = [
  { id: "d1", name: "Dr. Priya Sharma", experience: "12 years", designation: "Senior Cardiologist", specialization: "Cardiology", consultingFee: "₹500", bio: "Experienced cardiologist with expertise in interventional cardiology.", hospitalId: "1", status: "approved" },
  { id: "d2", name: "Dr. Rajesh Kumar", experience: "8 years", designation: "Orthopedic Surgeon", specialization: "Orthopedics", consultingFee: "₹600", bio: "Specialized in joint replacement and sports injuries.", hospitalId: "1", status: "approved" },
  { id: "d3", name: "Dr. Anita Desai", experience: "15 years", designation: "General Physician", specialization: "General Medicine", consultingFee: "₹300", bio: "Comprehensive care for all age groups.", hospitalId: "2", status: "approved" },
  { id: "d4", name: "Dr. Suresh Patel", experience: "10 years", designation: "Pediatrician", specialization: "Pediatrics", consultingFee: "₹400", bio: "Dedicated to child health and wellness.", hospitalId: "3", status: "approved" },
  { id: "d5", name: "Dr. Meena Rao", experience: "6 years", designation: "Dermatologist", specialization: "Dermatology", consultingFee: "₹450", bio: "Expert in skin care and cosmetic dermatology.", hospitalId: "4", status: "pending", email: "meena@clinic.com", clinicName: "SkinCare Plus", clinicLocation: "HSR Layout, Bangalore" },
];

const mockSlots: TimeSlot[] = [
  { id: "s1", time: "9:00 AM", available: true },
  { id: "s2", time: "9:30 AM", available: true },
  { id: "s3", time: "10:00 AM", available: false },
  { id: "s4", time: "10:30 AM", available: true },
  { id: "s5", time: "11:00 AM", available: true },
  { id: "s6", time: "11:30 AM", available: false },
  { id: "s7", time: "2:00 PM", available: true },
  { id: "s8", time: "2:30 PM", available: true },
  { id: "s9", time: "3:00 PM", available: true },
  { id: "s10", time: "3:30 PM", available: false },
  { id: "s11", time: "4:00 PM", available: true },
];

const mockAppointments: Appointment[] = [
  { id: "a1", patientName: "John Doe", age: 35, gender: "Male", problem: "Chest pain and shortness of breath", contact: "9876543210", doctorId: "d1", doctorName: "Dr. Priya Sharma", slotTime: "9:00 AM", date: "2026-02-15", status: "pending" },
  { id: "a2", patientName: "Jane Smith", age: 28, gender: "Female", problem: "Knee pain after exercise", contact: "9876543211", doctorId: "d2", doctorName: "Dr. Rajesh Kumar", slotTime: "10:30 AM", date: "2026-02-15", status: "approved" },
  { id: "a3", patientName: "Ravi Kumar", age: 45, gender: "Male", problem: "Recurring fever and fatigue", contact: "9876543212", doctorId: "d3", doctorName: "Dr. Anita Desai", slotTime: "2:00 PM", date: "2026-02-16", status: "pending" },
];

// API placeholder functions
export async function fetchHospitals(filters?: { state?: string; area?: string; pincode?: string }): Promise<Hospital[]> {
  // Replace with: fetch(`${WEBHOOK_BASE}/hospitals`, { method: 'POST', body: JSON.stringify(filters) })
  await new Promise(r => setTimeout(r, 800));
  let results = mockHospitals;
  if (filters?.state) results = results.filter(h => h.state.toLowerCase().includes(filters.state!.toLowerCase()));
  if (filters?.area) results = results.filter(h => h.area.toLowerCase().includes(filters.area!.toLowerCase()));
  if (filters?.pincode) results = results.filter(h => h.pincode.includes(filters.pincode!));
  return results;
}

export async function fetchDoctorsBySpecialization(hospitalId: string, specialization: string): Promise<Doctor[]> {
  await new Promise(r => setTimeout(r, 600));
  return mockDoctors.filter(d => d.hospitalId === hospitalId && d.specialization === specialization && d.status === "approved");
}

export async function fetchAvailableSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
  await new Promise(r => setTimeout(r, 500));
  return mockSlots.filter(s => s.available);
}

export async function submitAppointment(data: Omit<Appointment, "id" | "status">): Promise<{ success: boolean; message: string }> {
  await new Promise(r => setTimeout(r, 1000));
  return { success: true, message: "Appointment booked successfully!" };
}

export async function registerDoctor(data: any): Promise<{ success: boolean; message: string }> {
  await new Promise(r => setTimeout(r, 1000));
  return { success: true, message: "Registration submitted! Awaiting admin approval." };
}

export async function approveDoctor(doctorId: string): Promise<{ success: boolean }> {
  await new Promise(r => setTimeout(r, 500));
  return { success: true };
}

export async function rejectDoctor(doctorId: string): Promise<{ success: boolean }> {
  await new Promise(r => setTimeout(r, 500));
  return { success: true };
}

export async function fetchAllDoctors(): Promise<Doctor[]> {
  await new Promise(r => setTimeout(r, 600));
  return mockDoctors;
}

export async function fetchAppointments(doctorId?: string): Promise<Appointment[]> {
  await new Promise(r => setTimeout(r, 600));
  if (doctorId) return mockAppointments.filter(a => a.doctorId === doctorId);
  return mockAppointments;
}

export async function approveAppointment(appointmentId: string): Promise<{ success: boolean }> {
  await new Promise(r => setTimeout(r, 500));
  return { success: true };
}

export async function rejectAppointment(appointmentId: string): Promise<{ success: boolean }> {
  await new Promise(r => setTimeout(r, 500));
  return { success: true };
}
