import axios from 'axios'

// Crear instancia de Axios
const Client = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:3300',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de peticiones (request)
Client.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar tokens de autenticación si los necesitas
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // Log para desarrollo
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)

    return config
  },
  (error) => {
    console.error('❌ Error en la petición:', error)
    return Promise.reject(error)
  }
)

// Interceptor de respuestas (response)
Client.interceptors.response.use(
  (response) => {
    // Log para desarrollo
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status)

    return response
  },
  (error) => {
    // Manejo de errores global
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('❌ Error de respuesta:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      })

      // Manejo de errores específicos
      switch (error.response.status) {
        case 401:
          console.error('No autorizado - Redirigir al login')
          // window.location.href = '/login'
          break
        case 403:
          console.error('Acceso prohibido')
          break
        case 404:
          console.error('Recurso no encontrado')
          break
        case 500:
          console.error('Error interno del servidor')
          break
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('❌ No hay respuesta del servidor:', error.request)
    } else {
      // Algo pasó al configurar la petición
      console.error('❌ Error en la configuración:', error.message)
    }

    return Promise.reject(error)
  }
)

// Exportar el cliente
export { Client }

// Exportar también como default
export default Client
