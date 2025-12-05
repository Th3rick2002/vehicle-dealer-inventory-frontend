<template>
  <div class="space-y-6">
    <!-- Header con estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Usuarios</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ users.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Administradores</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ adminCount }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Vendedores</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ vendorCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Activos Hoy</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ activeCount }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-800">Gestión de Usuarios</h3>
          <p class="text-sm text-gray-500 mt-1">Administra los usuarios del sistema</p>
        </div>
        <button
          @click="openAddUserModal"
          class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Agregar Usuario
        </button>
      </div>

      <!-- Filtros -->
      <div class="p-6 bg-gray-50 border-b border-gray-100">
        <div class="flex items-center gap-4 flex-wrap">
          <div class="relative flex-1 min-w-[250px]">
            <svg class="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por nombre o email..."
              class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            v-model="filterRole"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los roles</option>
            <option value="Admin">Administrador</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Visualizador">Visualizador</option>
          </select>
          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Usuario</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rol</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Último Acceso</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Acciones</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ user.name.charAt(0) }}
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">{{ user.name }}</div>
                  <div class="text-xs text-gray-500">{{ user.department }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ user.email }}</td>
            <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  roleColors[user.role]
                ]">
                  {{ user.role }}
                </span>
            </td>
            <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ user.status }}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ user.lastAccess }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="editUser(user)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="toggleUserStatus(user)"
                  class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  :title="user.status === 'Activo' ? 'Desactivar' : 'Activar'"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </button>
                <button
                  @click="deleteUser(user)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Agregar/Editar Usuario -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-800">
            {{ editingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="juan@ejemplo.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
            <input
              v-model="formData.department"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: Ventas"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rol</label>
            <select
              v-model="formData.role"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Seleccionar rol</option>
              <option value="Admin">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Visualizador">Visualizador</option>
            </select>
          </div>

          <div v-if="!editingUser">
            <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              v-model="formData.password"
              type="password"
              :required="!editingUser"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {{ editingUser ? 'Guardar Cambios' : 'Crear Usuario' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  department: string
  role: string
  status: string
  lastAccess: string
}

const users = ref<User[]>([
  {
    id: 1,
    name: 'Carlos Martínez',
    email: 'carlos@autoinventory.com',
    department: 'Administración',
    role: 'Admin',
    status: 'Activo',
    lastAccess: 'Hace 5 min'
  },
  {
    id: 2,
    name: 'Ana García',
    email: 'ana@autoinventory.com',
    department: 'Ventas',
    role: 'Vendedor',
    status: 'Activo',
    lastAccess: 'Hace 1 hora'
  },
  {
    id: 3,
    name: 'Luis Rodríguez',
    email: 'luis@autoinventory.com',
    department: 'Ventas',
    role: 'Vendedor',
    status: 'Activo',
    lastAccess: 'Hace 2 horas'
  },
  {
    id: 4,
    name: 'María López',
    email: 'maria@autoinventory.com',
    department: 'Logística',
    role: 'Visualizador',
    status: 'Activo',
    lastAccess: 'Hace 3 horas'
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    email: 'pedro@autoinventory.com',
    department: 'Ventas',
    role: 'Vendedor',
    status: 'Inactivo',
    lastAccess: 'Hace 2 días'
  }
])

const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const showModal = ref(false)
const editingUser = ref<User | null>(null)

const formData = ref({
  name: '',
  email: '',
  department: '',
  role: '',
  password: '',
  status: 'Activo'
})

const roleColors: Record<string, string> = {
  'Admin': 'bg-purple-100 text-purple-800',
  'Vendedor': 'bg-blue-100 text-blue-800',
  'Visualizador': 'bg-gray-100 text-gray-800'
}

const adminCount = computed(() => users.value.filter(u => u.role === 'Admin').length)
const vendorCount = computed(() => users.value.filter(u => u.role === 'Vendedor').length)
const activeCount = computed(() => users.value.filter(u => u.status === 'Activo').length)

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = searchQuery.value === '' ||
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = filterRole.value === '' || user.role === filterRole.value
    const matchesStatus = filterStatus.value === '' || user.status === filterStatus.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

const openAddUserModal = () => {
  editingUser.value = null
  formData.value = {
    name: '',
    email: '',
    department: '',
    role: '',
    password: '',
    status: 'Activo'
  }
  showModal.value = true
}

const editUser = (user: User) => {
  editingUser.value = user
  formData.value = {
    name: user.name,
    email: user.email,
    department: user.department,
    role: user.role,
    password: '',
    status: user.status
  }
  showModal.value = true
}

const saveUser = () => {
  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value!.id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        ...formData.value,
        lastAccess: 'Hace 1 min'
      }
      alert('Usuario actualizado correctamente')
    }
  } else {
    const newUser: User = {
      id: Math.max(...users.value.map(u => u.id)) + 1,
      ...formData.value,
      lastAccess: 'Recién creado'
    }
    users.value.push(newUser)
    alert('Usuario creado correctamente')
  }
  closeModal()
}

const toggleUserStatus = (user: User) => {
  const index = users.value.findIndex(u => u.id === user.id)
  if (index !== -1) {
    users.value[index].status = users.value[index].status === 'Activo' ? 'Inactivo' : 'Activo'
    alert(`Usuario ${users.value[index].status === 'Activo' ? 'activado' : 'desactivado'} correctamente`)
  }
}

const deleteUser = (user: User) => {
  if (confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value.splice(index, 1)
      alert('Usuario eliminado correctamente')
    }
  }
}

const closeModal = () => {
  showModal.value = false
  editingUser.value = null
}
</script>
