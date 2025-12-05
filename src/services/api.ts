// services/api.ts
import { Client } from './client'
import type { AxiosError } from 'axios'

// Tipos de datos
export interface Vehicle {
  id?: number
  vin: string
  brand: string
  model: string
  year: number
  color: string
  price: number
  status: string
  engineType: string
  gearbox: string
  createdAt?: string
  updatedAt?: string
}

export interface Brand {
  id?: number
  name: string
  logo?: string
  country?: string
  vehicleCount?: number
  status?: 'Activa' | 'Inactiva'
  createdAt?: string
}

export interface User {
  id?: number
  name: string
  email: string
  department: string
  role: string
  status: string
  lastAccess?: string
  password?: string
}

// Clase para manejar errores de API
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// Función auxiliar para manejar errores de Axios
function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    const message = (error.response.data as any)?.message || error.message
    throw new APIError(message, error.response.status, error.response.data)
  } else if (error.request) {
    throw new APIError('No se pudo conectar con el servidor', 0)
  } else {
    throw new APIError(error.message)
  }
}

// ======================
// VEHICLES API
// ======================
export const vehiclesAPI = {
  async getAll(): Promise<Vehicle[]> {
    try {
      const response = await Client.get<Vehicle[]>('/api/vehicles')
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async getById(id: number): Promise<Vehicle> {
    try {
      const response = await Client.get<Vehicle>(`/api/vehicles/${id}`)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async create(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    try {
      const response = await Client.post<Vehicle>('/api/vehicles', vehicle)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const response = await Client.put<Vehicle>(`/api/vehicles/${id}`, vehicle)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async patch(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const response = await Client.patch<Vehicle>(`/api/vehicles/${id}`, vehicle)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await Client.delete(`/api/vehicles/${id}`)
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },
}

// ======================
// BRANDS API
// ======================
export const brandsAPI = {
  async getAll(): Promise<Brand[]> {
    try {
      const response = await Client.get<Brand[]>('/api/brands')
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async getById(id: number): Promise<Brand> {
    try {
      const response = await Client.get<Brand>(`/api/brands/${id}`)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async create(brand: Omit<Brand, 'id'>): Promise<Brand> {
    try {
      const response = await Client.post<Brand>('/api/brands', brand)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async update(id: number, brand: Partial<Brand>): Promise<Brand> {
    try {
      const response = await Client.put<Brand>(`/api/brands/${id}`, brand)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await Client.delete(`/api/brands/${id}`)
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },
}

// ======================
// USERS API
// ======================
export const usersAPI = {
  async getAll(): Promise<User[]> {
    try {
      const response = await Client.get<User[]>('/api/users')
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async getById(id: number): Promise<User> {
    try {
      const response = await Client.get<User>(`/api/users/${id}`)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      const response = await Client.post<User>('/api/users', user)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async update(id: number, user: Partial<User>): Promise<User> {
    try {
      const response = await Client.put<User>(`/api/users/${id}`, user)
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await Client.delete(`/api/users/${id}`)
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },
}

// ======================
// STATS API (Opcional)
// ======================
export const statsAPI = {
  async getDashboard(): Promise<any> {
    try {
      const response = await Client.get('/api/stats/dashboard')
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },

  async getVehicleStats(): Promise<any> {
    try {
      const response = await Client.get('/api/stats/vehicles')
      return response.data
    } catch (error) {
      return handleAxiosError(error as AxiosError)
    }
  },
}
