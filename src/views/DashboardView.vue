<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import VehicleTable from '../components/VehicleTable.vue'
import BrandsView from '../components/BrandsView.vue'
import UsersView from '../components/UsersView.vue'
import SettingsView from '../components/SettingsView.vue'

const router = useRouter()

const sidebarOpen = ref(true)
const activeView = ref('dashboard')

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'vehicles', label: 'Vehículos' },
  { id: 'brands', label: 'Marcas' },
  { id: 'users', label: 'Usuarios' },
  { id: 'settings', label: 'Configuración' }
]

const stats = [
  { label: 'Total Vehículos', value: '156', change: '+12%', color: 'bg-blue-500' },
  { label: 'Disponibles', value: '89', change: '+8%', color: 'bg-green-500' },
  { label: 'En Tránsito', value: '34', change: '+5%', color: 'bg-yellow-500' },
  { label: 'Vendidos', value: '33', change: '+15%', color: 'bg-purple-500' }
]

const vehicles = ref([
  {
    id: 1,
    vin: 'WBADT43452G123456',
    brand: 'Toyota',
    model: 'Camry',
    year: 2024,
    color: 'Blanco',
    price: 28500,
    status: 'Disponible',
    engineType: 'Gasolina',
    gearbox: 'Automática'
  },
  {
    id: 2,
    vin: 'KMHDN46D88U123789',
    brand: 'Honda',
    model: 'Civic',
    year: 2024,
    color: 'Negro',
    price: 24900,
    status: 'En_Transito',
    engineType: 'Híbrido',
    gearbox: 'Automática'
  },
  {
    id: 3,
    vin: '1HGBH41JXMN109456',
    brand: 'Ford',
    model: 'Mustang',
    year: 2023,
    color: 'Rojo',
    price: 45000,
    status: 'Reservado',
    engineType: 'Gasolina',
    gearbox: 'Manual'
  },
  {
    id: 4,
    vin: '5YJSA1E26HF123456',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    color: 'Azul',
    price: 85000,
    status: 'Disponible',
    engineType: 'Eléctrico',
    gearbox: 'Automática'
  },
  {
    id: 5,
    vin: '3VW2B7AJ8DM123456',
    brand: 'Volkswagen',
    model: 'Jetta',
    year: 2023,
    color: 'Gris',
    price: 22500,
    status: 'Vendido',
    engineType: 'Gasolina',
    gearbox: 'Manual'
  },
  {
    id: 6,
    vin: '2HGFC2F59JH123456',
    brand: 'Honda',
    model: 'Accord',
    year: 2024,
    color: 'Plata',
    price: 32000,
    status: 'En_Preparacion',
    engineType: 'Híbrido',
    gearbox: 'Automática'
  },
  {
    id: 7,
    vin: '1FTFW1ET5DFC12345',
    brand: 'Ford',
    model: 'F-150',
    year: 2023,
    color: 'Negro',
    price: 52000,
    status: 'Disponible',
    engineType: 'Gasolina',
    gearbox: 'Automática'
  },
  {
    id: 8,
    vin: 'JTDKARFP0J3123456',
    brand: 'Toyota',
    model: 'Prius',
    year: 2024,
    color: 'Verde',
    price: 29500,
    status: 'Entregado',
    engineType: 'Híbrido',
    gearbox: 'Automática'
  }
])

const statusColors: Record<string, string> = {
  'Disponible': 'bg-green-100 text-green-800',
  'En_Transito': 'bg-blue-100 text-blue-800',
  'En_Preparacion': 'bg-yellow-100 text-yellow-800',
  'Reservado': 'bg-orange-100 text-orange-800',
  'Vendido': 'bg-purple-100 text-purple-800',
  'Entregado': 'bg-gray-100 text-gray-800'
}

const viewTitle = computed(() => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    vehicles: 'Gestión de Vehículos',
    brands: 'Gestión de Marcas',
    users: 'Gestión de Usuarios',
    settings: 'Configuración'
  }
  return titles[activeView.value] || 'Dashboard'
})

const handleAddVehicle = () => {
  console.log('Navegando a /add-vehicle')
  router.push('/add-vehicle')
}

const handleViewVehicle = (vehicle: any) => {
  console.log('Ver vehículo:', vehicle)
  alert(`Ver detalles de: ${vehicle.brand} ${vehicle.model}\nVIN: ${vehicle.vin}`)
}

const handleEditVehicle = (vehicle: any) => {
  console.log('Editar vehículo:', vehicle)
  alert(`Editar: ${vehicle.brand} ${vehicle.model}`)
}

const handleDeleteVehicle = (vehicle: any) => {
  console.log('Eliminar vehículo:', vehicle)
  if (confirm(`¿Estás seguro de eliminar ${vehicle.brand} ${vehicle.model}?`)) {
    const index = vehicles.value.findIndex(v => v.id === vehicle.id)
    if (index !== -1) {
      vehicles.value.splice(index, 1)
      alert('Vehículo eliminado correctamente')
    }
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-gradient-to-b from-indigo-900 to-indigo-700 text-white transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-20'
      ]"
    >
      <div class="p-4 flex items-center justify-between border-b border-indigo-600">
        <h1 v-if="sidebarOpen" class="text-xl font-bold">AutoInventory</h1>
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="p-2 hover:bg-indigo-600 rounded-lg"
        >
          <svg
            v-if="sidebarOpen"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="activeView = item.id"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
            activeView === item.id
              ? 'bg-white text-indigo-900 shadow-lg'
              : 'text-indigo-100 hover:bg-indigo-600'
          ]"
        >
          <span v-if="sidebarOpen" class="font-medium">{{ item.label }}</span>
        </button>
      </nav>

      <div class="p-4 border-t border-indigo-600">
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-indigo-100 hover:bg-indigo-600 rounded-lg transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span v-if="sidebarOpen">Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">
              {{ viewTitle }}
            </h2>
            <p class="text-gray-500 text-sm mt-1">Bienvenido al sistema de inventario</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative">
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
                type="text"
                placeholder="Buscar vehículo..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <button class="p-2 hover:bg-gray-100 rounded-lg relative">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto p-6">
        <!-- Dashboard View -->
        <div v-if="activeView === 'dashboard'" class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(stat, idx) in stats"
              :key="idx"
              class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-500 text-sm">{{ stat.label }}</p>
                  <p class="text-3xl font-bold text-gray-800 mt-2">{{ stat.value }}</p>
                  <p class="text-green-600 text-sm mt-2 font-medium">{{ stat.change }}</p>
                </div>
                <div
                  :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center']"
                >
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Vehicles Table -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h3 class="text-lg font-bold text-gray-800">Últimos Vehículos Agregados</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VIN
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marca/Modelo
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Año
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Color
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="vehicle in vehicles.slice(0, 5)"
                  :key="vehicle.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {{ vehicle.vin }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ vehicle.brand }}</div>
                    <div class="text-sm text-gray-500">{{ vehicle.model }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vehicle.year }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ vehicle.color }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${{ vehicle.price.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                        statusColors[vehicle.status]
                      ]"
                    >
                      {{ vehicle.status.replace('_', ' ') }}
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Vehicles View -->
        <VehicleTable
          v-if="activeView === 'vehicles'"
          :vehicles="vehicles"
          title="Gestión de Vehículos"
          subtitle="Administra todo tu inventario desde aquí"
          :show-filters="true"
          :show-add-button="true"
          @add-vehicle="handleAddVehicle"
          @view-vehicle="handleViewVehicle"
          @edit-vehicle="handleEditVehicle"
          @delete-vehicle="handleDeleteVehicle"
        />

        <!-- Brands View -->
        <BrandsView v-if="activeView === 'brands'" />

        <!-- Users View -->
        <UsersView v-if="activeView === 'users'" />

        <!-- Settings View -->
        <SettingsView v-if="activeView === 'settings'" />
      </main>
    </div>
  </div>
</template>
