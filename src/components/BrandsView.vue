<script setup lang="ts">
import { ref, computed } from 'vue'

interface Brand {
  id: number
  name: string
  logo: string
  country: string
  vehicleCount: number
  status: 'Activa' | 'Inactiva'
  createdAt: string
}

const brands = ref<Brand[]>([
  { id: 1, name: 'Toyota', logo: '🚗', country: 'Japón', vehicleCount: 2, status: 'Activa', createdAt: '2024-01-15' },
  { id: 2, name: 'Honda', logo: '🚙', country: 'Japón', vehicleCount: 2, status: 'Activa', createdAt: '2024-01-20' },
  { id: 3, name: 'Ford', logo: '🚐', country: 'Estados Unidos', vehicleCount: 2, status: 'Activa', createdAt: '2024-02-10' },
  { id: 4, name: 'Tesla', logo: '⚡', country: 'Estados Unidos', vehicleCount: 1, status: 'Activa', createdAt: '2024-02-15' },
  { id: 5, name: 'Volkswagen', logo: '🚕', country: 'Alemania', vehicleCount: 1, status: 'Activa', createdAt: '2024-03-01' },
  { id: 6, name: 'BMW', logo: '🏎️', country: 'Alemania', vehicleCount: 0, status: 'Inactiva', createdAt: '2024-03-10' }
])

const searchQuery = ref('')
const filterStatus = ref('')
const showModal = ref(false)
const editingBrand = ref<Brand | null>(null)

const formData = ref({
  name: '',
  logo: '🚗',
  country: '',
  status: 'Activa' as 'Activa' | 'Inactiva'
})

const logos = ['🚗', '🚙', '🚐', '🚕', '🏎️', '⚡', '🚛', '🚚']

const filteredBrands = computed(() => {
  return brands.value.filter(brand => {
    const matchesSearch = searchQuery.value === '' ||
      brand.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      brand.country.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = filterStatus.value === '' || brand.status === filterStatus.value

    return matchesSearch && matchesStatus
  })
})

const totalVehicles = computed(() => {
  return brands.value.reduce((sum, brand) => sum + brand.vehicleCount, 0)
})

const activeBrands = computed(() => {
  return brands.value.filter(b => b.status === 'Activa').length
})

const openAddModal = () => {
  editingBrand.value = null
  formData.value = {
    name: '',
    logo: '🚗',
    country: '',
    status: 'Activa'
  }
  showModal.value = true
}

const openEditModal = (brand: Brand) => {
  editingBrand.value = brand
  formData.value = {
    name: brand.name,
    logo: brand.logo,
    country: brand.country,
    status: brand.status
  }
  showModal.value = true
}

const saveBrand = () => {
  if (!formData.value.name || !formData.value.country) {
    alert('Por favor completa todos los campos')
    return
  }

  if (editingBrand.value) {
    // Editar
    const index = brands.value.findIndex(b => b.id === editingBrand.value!.id)
    if (index !== -1) {
      brands.value[index] = {
        ...brands.value[index],
        ...formData.value
      }
    }
  } else {
    // Agregar
    const newBrand: Brand = {
      id: Math.max(...brands.value.map(b => b.id)) + 1,
      ...formData.value,
      vehicleCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    brands.value.push(newBrand)
  }

  showModal.value = false
}

const deleteBrand = (brand: Brand) => {
  if (brand.vehicleCount > 0) {
    alert(`No se puede eliminar ${brand.name} porque tiene ${brand.vehicleCount} vehículos asociados`)
    return
  }

  if (confirm(`¿Estás seguro de eliminar la marca ${brand.name}?`)) {
    const index = brands.value.findIndex(b => b.id === brand.id)
    if (index !== -1) {
      brands.value.splice(index, 1)
    }
  }
}

const toggleStatus = (brand: Brand) => {
  brand.status = brand.status === 'Activa' ? 'Inactiva' : 'Activa'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Marcas</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ brands.length }}</p>
          </div>
          <div class="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span class="text-2xl">🏢</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Marcas Activas</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ activeBrands }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <span class="text-2xl">✅</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">Total Vehículos</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{ totalVehicles }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <span class="text-2xl">🚗</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-800">Gestión de Marcas</h3>
          <p class="text-sm text-gray-500 mt-1">Administra las marcas de vehículos</p>
        </div>
        <button
          @click="openAddModal"
          class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Agregar Marca
        </button>
      </div>

      <!-- Filters -->
      <div class="p-6 bg-gray-50 border-b border-gray-100">
        <div class="flex items-center gap-4">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-2.5 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar marca o país..."
              class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos los estados</option>
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
          </select>
        </div>
      </div>

      <!-- Grid de Marcas -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="brand in filteredBrands"
            :key="brand.id"
            class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {{ brand.logo }}
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ brand.name }}</h4>
                  <p class="text-sm text-gray-500">{{ brand.country }}</p>
                </div>
              </div>
              <span
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  brand.status === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ brand.status }}
              </span>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Vehículos:</span>
                <span class="font-semibold text-gray-900">{{ brand.vehicleCount }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Creada:</span>
                <span class="text-gray-900">{{ new Date(brand.createdAt).toLocaleDateString() }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                @click="openEditModal(brand)"
                class="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Editar
              </button>
              <button
                @click="toggleStatus(brand)"
                class="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {{ brand.status === 'Activa' ? 'Desactivar' : 'Activar' }}
              </button>
              <button
                @click="deleteBrand(brand)"
                class="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredBrands.length === 0" class="text-center py-12">
          <p class="text-gray-500">No se encontraron marcas</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-xl font-bold text-gray-900">
            {{ editingBrand ? 'Editar Marca' : 'Nueva Marca' }}
          </h3>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: Toyota"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Logo (Emoji)</label>
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="logo in logos"
                :key="logo"
                @click="formData.logo = logo"
                :class="[
                  'w-10 h-10 text-2xl rounded-lg border-2 transition-colors',
                  formData.logo === logo ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                {{ logo }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">País</label>
            <input
              v-model="formData.country"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: Japón"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex gap-3">
          <button
            @click="showModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="saveBrand"
            class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {{ editingBrand ? 'Guardar' : 'Crear' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
