<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
    <!-- Encabezado -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Agregar Nuevo Vehículo</h2>
      <p class="text-gray-500 text-sm mt-1">Complete la información del vehículo</p>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Grid de 2 columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- VIN -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            VIN <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.vin"
            type="text"
            placeholder="Ej: WBADT43452G123456"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <!-- Marca -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Marca <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.brand"
            type="text"
            placeholder="Ej: Toyota"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <!-- Modelo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Modelo <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.model"
            type="text"
            placeholder="Ej: Camry"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <!-- Año -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Año <span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="formData.year"
            type="number"
            placeholder="Ej: 2024"
            min="1900"
            :max="new Date().getFullYear() + 1"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <!-- Color -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Color <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.color"
            type="text"
            placeholder="Ej: Blanco"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <!-- Precio -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Precio ($) <span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="formData.price"
            type="number"
            placeholder="Ej: 28500"
            min="0"
            step="100"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <!-- Estado -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Estado <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.status"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
            required
          >
            <option value="">Seleccione un estado</option>
            <option value="Disponible">Disponible</option>
            <option value="En_Transito">En Tránsito</option>
            <option value="En_Preparacion">En Preparación</option>
            <option value="Reservado">Reservado</option>
            <option value="Vendido">Vendido</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>

        <!-- Tipo de Motor -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Motor <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.engineType"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
            required
          >
            <option value="">Seleccione tipo de motor</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>

        <!-- Transmisión -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Transmisión <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.gearbox"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
            required
          >
            <option value="">Seleccione transmisión</option>
            <option value="Manual">Manual</option>
            <option value="Automática">Automática</option>
          </select>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex gap-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          @click="handleCancel"
          class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
        >
          Guardar Vehículo
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

interface VehicleFormData {
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

const router = useRouter()

const formData = reactive<VehicleFormData>({
  vin: '',
  brand: '',
  model: '',
  year: null,
  color: '',
  price: null,
  status: '',
  engineType: '',
  gearbox: ''
})

const emit = defineEmits<{
  submit: [data: VehicleFormData]
  cancel: []
}>()

const handleSubmit = () => {
  // Validación básica
  if (!formData.vin || !formData.brand || !formData.model || !formData.year ||
    !formData.color || !formData.price || !formData.status ||
    !formData.engineType || !formData.gearbox) {
    alert('Por favor complete todos los campos requeridos')
    return
  }

  // Crear objeto con los datos del vehículo
  const vehicleData = { ...formData }

  // Emitir evento para que el padre maneje los datos (opcional)
  emit('submit', vehicleData)

  // Log para debug
  console.log('Vehículo guardado:', vehicleData)

  // Mostrar confirmación
  alert(`✅ Vehículo agregado exitosamente:\n\n${formData.brand} ${formData.model} ${formData.year}\nVIN: ${formData.vin}\nPrecio: ${formData.price?.toLocaleString()}`)

  // Redirigir al dashboard
  router.push('/')
}

const handleCancel = () => {
  // Verificar si hay datos ingresados
  const hasData = formData.vin || formData.brand || formData.model ||
    formData.year || formData.color || formData.price ||
    formData.status || formData.engineType || formData.gearbox

  if (hasData) {
    if (confirm('¿Está seguro de cancelar? Se perderán los datos ingresados.')) {
      router.push('/')
    }
  } else {
    router.push('/')
  }
}
</script>
