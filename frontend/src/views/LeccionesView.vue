<template>
    <div class="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-6">

        <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
            📚 Catálogo de Lecciones
        </h1>
        <p class="text-xl text-gray-600 mb-8">
            Aquí podrás acceder al contenido interactivo adaptado a tu Nivel (Semilla, Brote o Árbol), directamente desde la base de datos de lecciones.
        </p>

        <div class="space-y-4">

            <div class="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-lg flex justify-between items-center">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Lección: El Riesgo Inesperado</h3>
                    <p class="text-sm text-gray-600">Foco pedagógico: Fondo de emergencia. (Nivel Brote)</p>
                </div>
                <button class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">Iniciar</button>
            </div>

            <div class="p-4 border-l-4 border-gray-400 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Lección: La Competencia</h3>
                    <p class="text-sm text-gray-600">Foco pedagógico: La oferta y la demanda. (Nivel Semilla)</p>
                </div>
                <button class="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed">Completado</button>
            </div>

            <div class="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg flex justify-between items-center">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Lección: Interés Compuesto</h3>
                    <p class="text-sm text-gray-600">Foco pedagógico: Inversión. (Nivel Árbol)</p>
                </div>
                <button class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Pendiente</button>
            </div>

        </div>

    </div>
</template>
