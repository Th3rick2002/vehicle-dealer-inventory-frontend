<template>
  <div class="space-y-6">
    <!-- Tabs de configuración -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Contenido de tabs -->
      <div class="p-6">
        <!-- Tab: Perfil -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-4">Información Personal</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-6">
                <div class="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {{ profileData.name.charAt(0) }}
                </div>
                <div>
                  <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Cambiar foto
                  </button>
                  <p class="text-xs text-gray-500 mt-2">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    v-model="profileData.name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    v-model="profileData.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    v-model="profileData.phone"
                    type="tel"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                  <input
                    v-model="profileData.department"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                @click="saveProfile"
                class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>

        <!-- Tab: Seguridad -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-4">Cambiar Contraseña</h3>
            <div class="max-w-md space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña actual</label>
                <input
                  v-model="passwordData.current"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                <input
                  v-model="passwordData.new"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar nueva contraseña</label>
                <input
                  v-model="passwordData.confirm"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                @click="changePassword"
                class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Actualizar contraseña
              </button>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Autenticación de Dos Factores</h3>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">Estado actual</p>
                <p class="text-sm text-gray-500">{{ twoFactorEnabled ? 'Activado' : 'Desactivado' }}</p>
              </div>
              <button
                @click="toggleTwoFactor"
                :class="[
                  'px-4 py-2 rounded-lg transition-colors',
                  twoFactorEnabled
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                ]"
              >
                {{ twoFactorEnabled ? 'Desactivar' : 'Activar' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Tab: Notificaciones -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-4">Preferencias de Notificaciones</h3>
            <div class="space-y-4">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p class="font-medium text-gray-800">{{ notification.title }}</p>
                  <p class="text-sm text-gray-500">{{ notification.description }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="notification.enabled"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
            <button
              @click="saveNotifications"
              class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Guardar preferencias
            </button>
          </div>
        </div>

        <!-- Tab: Sistema -->
        <div v-if="activeTab === 'system'" class="space-y-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-4">Configuración del Sistema</h3>
            <div class="space-y-4">
              <div class="p-4 border border-gray-200 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
                <input
                  v-model="systemSettings.companyName"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div class="p-4 border border-gray-200 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                <select
                  v-model="systemSettings.currency"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="USD">USD - Dólar Estadounidense</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="MXN">MXN - Peso Mexicano</option>
                  <option value="COP">COP - Peso Colombiano</option>
                </select>
              </div>

              <div class="p-4 border border-gray-200 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
                <select
                  v-model="systemSettings.timezone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="America/Los_Angeles">Pacífico (PT)</option>
                  <option value="America/Denver">Montaña (MT)</option>
                  <option value="America/Chicago">Central (CT)</option>
                  <option value="America/New_York">Este (ET)</option>
                  <option value="America/Mexico_City">Ciudad de México</option>
                </select>
              </div>

              <div class="p-4 border border-gray-200 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Idioma del Sistema</label>
                <select
                  v-model="systemSettings.language"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              <button
                @click="saveSystemSettings"
                class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Guardar configuración
              </button>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Base de Datos</h3>
            <div class="space-y-3">
              <button
                @click="backupDatabase"
                class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div class="text-left">
                    <p class="font-medium text-gray-800">Crear Respaldo</p>
                    <p class="text-sm text-gray-500">Exportar base de datos completa</p>
                  </div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                @click="restoreDatabase"
                class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <div class="text-left">
                    <p class="font-medium text-gray-800">Restaurar Respaldo</p>
                    <p class="text-sm text-gray-500">Importar base de datos desde archivo</p>
                  </div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Tab: Acerca de -->
        <div v-if="activeTab === 'about'" class="space-y-6">
          <div class="text-center py-8">
            <div class="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">AutoInventory</h2>
            <p class="text-gray-500 mb-4">Sistema de Gestión de Inventario de Vehículos</p>
            <div class="inline-block px-4 py-2 bg-gray-100 rounded-lg">
              <p class="text-sm text-gray-600">Versión <span class="font-semibold">1.0.0</span></p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 border border-gray-200 rounded-lg text-center">
              <svg class="w-8 h-8 text-indigo-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="font-semibold text-gray-800 mb-2">Documentación</h3>
              <p class="text-sm text-gray-500 mb-3">Accede a la guía de usuario</p>
              <button class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                Ver documentos
              </button>
            </div>

            <div class="p-6 border border-gray-200 rounded-lg text-center">
              <svg class="w-8 h-8 text-indigo-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 class="font-semibold text-gray-800 mb-2">Soporte</h3>
              <p class="text-sm text-gray-500 mb-3">Contacta con el equipo técnico</p>
              <button class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                Abrir ticket
              </button>
            </div>

            <div class="p-6 border border-gray-200 rounded-lg text-center">
              <svg class="w-8 h-8 text-indigo-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="font-semibold text-gray-800 mb-2">Actualizaciones</h3>
              <p class="text-sm text-gray-500 mb-3">Verifica nuevas versiones</p>
              <button class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                Buscar actualizaciones
              </button>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 AutoInventory. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { id: 'profile', label: 'Perfil' },
  { id: 'security', label: 'Seguridad' },
  { id: 'notifications', label: 'Notificaciones' },
  { id: 'system', label: 'Sistema' },
  { id: 'about', label: 'Acerca de' }
]

const activeTab = ref('profile')

const profileData = ref({
  name: 'Carlos Martínez',
  email: 'carlos@autoinventory.com',
  phone: '+503 7890-1234',
  department: 'Administración'
})

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
})

const twoFactorEnabled = ref(false)

const notifications = ref([
  {
    id: 1,
    title: 'Nuevos vehículos',
    description: 'Recibir notificaciones cuando se agreguen nuevos vehículos',
    enabled: true
  },
  {
    id: 2,
    title: 'Cambios de estado',
    description: 'Notificar cuando un vehículo cambie de estado',
    enabled: true
  },
  {
    id: 3,
    title: 'Ventas completadas',
    description: 'Alertas cuando se concrete una venta',
    enabled: true
  },
  {
    id: 4,
    title: 'Inventario bajo',
    description: 'Avisar cuando el inventario esté por debajo del mínimo',
    enabled: false
  },
  {
    id: 5,
    title: 'Reportes semanales',
    description: 'Recibir resumen semanal por email',
    enabled: true
  }
])

const systemSettings = ref({
  companyName: 'AutoInventory SA',
  currency: 'USD',
  timezone: 'America/Mexico_City',
  language: 'es'
})

const saveProfile = () => {
  alert('Perfil actualizado correctamente')
}

const changePassword = () => {
  if (passwordData.value.new !== passwordData.value.confirm) {
    alert('Las contraseñas no coinciden')
    return
  }
  if (passwordData.value.new.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres')
    return
  }
  alert('Contraseña actualizada correctamente')
  passwordData.value = { current: '', new: '', confirm: '' }
}

const toggleTwoFactor = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  alert(`Autenticación de dos factores ${twoFactorEnabled.value ? 'activada' : 'desactivada'}`)
}

const saveNotifications = () => {
  alert('Preferencias de notificaciones guardadas')
}

const saveSystemSettings = () => {
  alert('Configuración del sistema actualizada')
}

const backupDatabase = () => {
  alert('Iniciando respaldo de base de datos...\nEsto puede tomar unos minutos.')
}

const restoreDatabase = () => {
  if (confirm('¿Estás seguro de restaurar la base de datos? Esto sobrescribirá todos los datos actuales.')) {
    alert('Selecciona el archivo de respaldo para restaurar')
  }
}
</script>
