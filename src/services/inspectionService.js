import axios from 'axios';

class InspectionService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Get all inspections for the inspector
  async getInspectorInspections() {
    return this.api.get('/inspections/inspector');
  }

  // Get inspection by ID
  async getInspection(id) {
    return this.api.get(`/inspections/${id}`);
  }

  // Schedule a new inspection
  async scheduleInspection(data) {
    return this.api.post('/inspections', data);
  }

  // Complete an inspection
  async completeInspection(id, formData) {
    return this.api.post(`/inspections/${id}/complete`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Update inspection status
  async updateInspectionStatus(id, status) {
    return this.api.patch(`/inspections/${id}/status`, { status });
  }

  // Get inspection report
  async getInspectionReport(id) {
    return this.api.get(`/inspections/${id}/report`, {
      responseType: 'blob'
    });
  }

  // Cancel inspection
  async cancelInspection(id, reason) {
    return this.api.post(`/inspections/${id}/cancel`, { reason });
  }

  // Reschedule inspection
  async rescheduleInspection(id, newDate, newTime) {
    return this.api.post(`/inspections/${id}/reschedule`, { date: newDate, time: newTime });
  }

  // Get available time slots for a specific date
  async getAvailableTimeSlots(date) {
    return this.api.get('/inspections/available-slots', {
      params: { date }
    });
  }
}

export const inspectionService = new InspectionService();
