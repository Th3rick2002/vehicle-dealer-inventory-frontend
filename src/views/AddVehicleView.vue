<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold mb-6">Agregar Nuevo Vehículo</h1>

    <form class="grid grid-cols-2 gap-6 max-w-3xl">
      <input class="border p-2 rounded" placeholder="VIN">
      <input class="border p-2 rounded" placeholder="Marca">
      <input class="border p-2 rounded" placeholder="Modelo">
      <input class="border p-2 rounded" placeholder="Año" type="number">
      <input class="border p-2 rounded" placeholder="Color">
      <input class="border p-2 rounded" placeholder="Precio" type="number">

      <select class="border p-2 rounded col-span-2">
        <option>Disponible</option>
        <option>En_Transito</option>
        <option>Vendido</option>
      </select>

      <button class="bg-indigo-600 text-white py-2 rounded col-span-2 hover:bg-indigo-700">
        Guardar Vehículo
      </button>
    </form>
  </div>
</template>
