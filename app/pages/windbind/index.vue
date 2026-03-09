<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  
  if (error) alert(error.message)
  else navigateTo('/admin/dashboard') // Your future admin home
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0f172a] p-6">
    <div class="w-full max-w-md p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
      <h1 class="text-2xl font-black text-white mb-8 tracking-tighter">ADMIN ACCESS_</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[--color-create-blue]"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[--color-create-blue]"
        />
        <button 
          :disabled="loading"
          class="w-full py-4 bg-[--color-create-blue] text-white font-black rounded-xl hover:brightness-110 transition-all disabled:opacity-50"
        >
          {{ loading ? 'AUTHENTICATING...' : 'ENTER STUDIO' }}
        </button>
      </form>
    </div>
  </div>
</template>