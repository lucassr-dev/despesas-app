<template>
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400 animate-pulse">
        Simplifique suas despesas compartilhadas
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        ExpenseShare: A maneira inteligente de gerenciar despesas em grupo, seja em viagens, eventos ou no dia a dia.
      </p>
    </div>
    
    <div class="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800">Por que escolher o ExpenseShare?</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">Divisão automática</h3>
            <p class="mt-2 text-base text-gray-500">Calcule instantaneamente quanto cada pessoa deve pagar ou receber.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">Crie grupos personalizados</h3>
            <p class="mt-2 text-base text-gray-500">Organize suas despesas por viagens, eventos ou ocasiões especiais.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">Atualizações em tempo real</h3>
            <p class="mt-2 text-base text-gray-500">Acompanhe as despesas e saldos à medida que são adicionados.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">Seguro e privado</h3>
            <p class="mt-2 text-base text-gray-500">Seus dados são protegidos e visíveis apenas para os membros do grupo.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <RouterLink to="/register" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        Comece agora - É grátis!
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// Lógica do componente, se necessária
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>