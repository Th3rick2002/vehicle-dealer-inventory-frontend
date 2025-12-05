<script setup lang="ts">
import { useRouter } from 'vue-router'
import VehicleFormCard from '../components/VehicleFormCard.vue'

const router = useRouter()

interface VehicleData {
  vin: string
  brand: string
  model: string
  year: number | null
  color: string
  price: number | null
  status: string
  engineType: string
  gearbox: string
}

const handleVehicleSubmit = (data: VehicleData) => {
  console.log('Datos del vehículo a guardar:', data)

  // Aquí puedes agregar la lógica para enviar los datos a tu API
  // Por ejemplo:
  // await api.vehicles.create(data)

  // El componente ya maneja la redirección al dashboard
}

const handleCancel = () => {
  console.log('Formulario cancelado')
  // Lógica adicional si es necesaria
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center gap-4">
        <button
          @click="router.push('/')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Agregar Vehículo</h2>
          <p class="text-gray-500 text-sm mt-1">Ingrese los datos del nuevo vehículo al inventario</p>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="p-6">
      <div class="max-w-4xl mx-auto">
        <VehicleFormCard
          @submit="handleVehicleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </main>
  </div>
</template>

