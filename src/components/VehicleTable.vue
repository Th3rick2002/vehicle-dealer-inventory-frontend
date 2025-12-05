<script setup lang="ts">
import { ref, computed } from 'vue'

interface Vehicle {
  id: number
  vin: string
  brand: string
  model: string
  year: number
  color: string
  price: number
  status: string
  engineType: string
  gearbox: string
}

interface Column {
  key: string
  label: string
}

interface Props {
  vehicles: Vehicle[]
  title?: string
  subtitle?: string
  showFilters?: boolean
  showAddButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Listado de Vehículos',
  subtitle: 'Administra tu inventario de vehículos',
  showFilters: true,
  showAddButton: true
})

defineEmits<{
  'add-vehicle': []
  'view-vehicle': [vehicle: Vehicle]
  'edit-vehicle': [vehicle: Vehicle]
  'delete-vehicle': [vehicle: Vehicle]
}>()

const searchQuery = ref('')
const filterStatus = ref('')
const filterBrand = ref('')

const columns: Column[] = [
  { key: 'vin', label: 'VIN' },
  { key: 'brand', label: 'Marca/Modelo' },
  { key: 'year', label: 'Año' },
  { key: 'color', label: 'Color' },
  { key: 'engineType', label: 'Motor' },
  { key: 'gearbox', label: 'Transmisión' },
  { key: 'price', label: 'Precio' },
  { key: 'status', label: 'Estado' }
]

const statusColors: Record<string, string> = {
  'Disponible': 'bg-green-100 text-green-800',
  'En_Transito': 'bg-blue-100 text-blue-800',
  'En_Preparacion': 'bg-yellow-100 text-yellow-800',
  'Reservado': 'bg-orange-100 text-orange-800',
  'Vendido': 'bg-purple-100 text-purple-800',
  'Entregado': 'bg-gray-100 text-gray-800'
}

const colorHexMap: Record<string, string> = {
  'Blanco': '#FFFFFF',
  'Negro': '#000000',
  'Rojo': '#EF4444',
  'Azul': '#3B82F6',
  'Gris': '#6B7280',
  'Plata': '#D1D5DB',
  'Verde': '#10B981',
  'Amarillo': '#FBBF24'
}

const uniqueBrands = computed(() => {
  return [...new Set(props.vehicles.map(v => v.brand))].sort()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || filterStatus.value !== '' || filterBrand.value !== ''
})

const filteredVehicles = computed(() => {
  return props.vehicles.filter(vehicle => {
    const matchesSearch = searchQuery.value === '' ||
      vehicle.vin.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = filterStatus.value === '' || vehicle.status === filterStatus.value
    const matchesBrand = filterBrand.value === '' || vehicle.brand === filterBrand.value

    return matchesSearch && matchesStatus && matchesBrand
  })
})

const totalInventoryValue = computed(() => {
  const total = filteredVehicles.value.reduce((sum, vehicle) => sum + vehicle.price, 0)
  return total.toLocaleString()
})

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ')
}

const getColorHex = (colorName: string): string => {
  return colorHexMap[colorName] || '#9CA3AF'
}

const clearFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  filterBrand.value = ''
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <!-- Header con título y botón agregar -->
    <div class="p-6 border-b border-gray-100 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold text-gray-800">{{ title }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <button
        v-if="showAddButton"
        @click="$emit('add-vehicle')"
        class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Agregar Vehículo
      </button>
    </div>

    <!-- Filtros -->
    <div v-if="showFilters" class="p-6 bg-gray-50 border-b border-gray-100">
      <div class="flex items-center gap-4 flex-wrap">
        <div class="relative flex-1 min-w-[250px]">
          <svg
            class="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por VIN, marca o modelo..."
            class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          v-model="filterStatus"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="En_Transito">En Tránsito</option>
          <option value="En_Preparacion">En Preparación</option>
          <option value="Reservado">Reservado</option>
          <option value="Vendido">Vendido</option>
          <option value="Entregado">Entregado</option>
        </select>

        <select
          v-model="filterBrand"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todas las marcas</option>
          <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>

        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
          <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-if="filteredVehicles.length === 0"
          class="hover:bg-gray-50"
        >
          <td colspan="9" class="px-6 py-12 text-center">
            <div class="flex flex-col items-center justify-center">
              <svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-gray-500 text-sm">No se encontraron vehículos</p>
            </div>
          </td>
        </tr>
        <tr
          v-for="vehicle in filteredVehicles"
          :key="vehicle.id"
          class="hover:bg-gray-50 transition-colors"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-sm font-mono text-gray-900">{{ vehicle.vin }}</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-semibold text-gray-900">{{ vehicle.brand }}</div>
            <div class="text-xs text-gray-500">{{ vehicle.model }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {{ vehicle.year }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-2">
                <span
                  class="w-3 h-3 rounded-full border border-gray-300"
                  :style="{ backgroundColor: getColorHex(vehicle.color) }"
                ></span>
              <span class="text-sm text-gray-700">{{ vehicle.color }}</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {{ vehicle.engineType }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {{ vehicle.gearbox }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-bold text-indigo-600">
                ${{ vehicle.price.toLocaleString() }}
              </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  statusColors[vehicle.status]
                ]"
              >
                {{ formatStatus(vehicle.status) }}
              </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right">
            <div class="flex items-center justify-end gap-2">
              <button
                @click="$emit('view-vehicle', vehicle)"
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Ver detalles"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button
                @click="$emit('edit-vehicle', vehicle)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="$emit('delete-vehicle', vehicle)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer con información -->
    <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
      <div class="text-sm text-gray-600">
        Mostrando <span class="font-semibold">{{ filteredVehicles.length }}</span> de
        <span class="font-semibold">{{ vehicles.length }}</span> vehículos
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-500">Total en inventario: ${{ totalInventoryValue }}</span>
      </div>
    </div>
  </div>
</template>


