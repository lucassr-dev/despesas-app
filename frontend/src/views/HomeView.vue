  <template>
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-6 text-center">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Bem-vindo ao ExpenseShare
        </span>
      </h1>
      
      <p class="text-xl mb-8 text-center">
        Simplifique o compartilhamento de despesas com amigos e família.
      </p>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Como funciona</h2>
          <ul class="list-disc list-inside space-y-2">
            <li>Crie grupos para diferentes ocasiões</li>
            <li>Adicione despesas e divida-as facilmente</li>
            <li>Veja saldos atualizados em tempo real</li>
            <li>Convide amigos para participar dos grupos</li>
          </ul>
        </div>
  
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Recursos</h2>
          <ul class="list-disc list-inside space-y-2">
            <li>Interface intuitiva e fácil de usar</li>
            <li>Cálculos automáticos de dívidas</li>
            <li>Histórico detalhado de despesas</li>
            <li>Seguro e confiável</li>
          </ul>
        </div>
      </div>
  
      <div class="mt-12 text-center">
        <router-link to="/register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg">
          Comece agora!
        </router-link>
      </div>
    </div>
  </template>

  <script setup>
  </script>
