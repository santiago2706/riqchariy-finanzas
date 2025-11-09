<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const showPwd = ref(false)
const remember = ref(true)
const formError = ref('')

const isDisabled = computed(() => auth?.isLoading || !email.value || !password.value)

async function onSubmit(){
  formError.value = ''
  try{
    await auth.login?.(email.value.trim(), password.value)
    if(remember.value){ try{ localStorage.setItem('rq_auth','1') }catch{} }
    router.push(route.query?.redirect?.toString?.() || '/')
  }catch(err){
    formError.value = (err?.message || auth?.error || 'No pudimos iniciar sesión.')
  }
}
</script>

<template>
  <section class="auth-wrapper flex justify-center">
    <div class="auth-card w-full max-w-xl">
      <!-- Tarjeta -->
      <div class="mt-8 rounded-[30px] ring-1 ring-black/10 overflow-hidden card-glass border-gradient">
        <div class="px-8 pt-8 pb-4">
          <h1 class="text-2xl font-extrabold text-emerald-800">¡Bienvenido de vuelta!<span aria-hidden="true"> 🎉👋</span></h1>
          <p class="text-sm text-slate-600 mt-1">Ingresa a tu cuenta para continuar tu aventura financiera.</p>
        </div>

        <form @submit.prevent="onSubmit" class="px-8 pb-8 space-y-5"> 
          <div>
            <label for="email" class="block text-sm font-semibold text-slate-800 mb-1">Correo Electrónico</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xl">📧</span>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm
                      focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300"
                placeholder="tu.correo@ejemplo.com"
              />
            </div>
          </div>

          <div class="mt-4">
            <label for="password" class="block text-sm font-semibold text-slate-800 mb-1">Contraseña</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🔒</span>
              <input
                :type="showPwd ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                autocomplete="current-password"
                class="w-full pl-10 pr-12 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm
                      focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPwd = !showPwd"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                aria-label="Mostrar u ocultar contraseña"
              >
                <span v-if="!showPwd">👁️</span>
                <span v-else>🙈</span>
              </button>
            </div>

            <div class="text-right mt-2">
              <RouterLink to="/reset" class="text-sm text-emerald-700 hover:underline">¿Olvidaste tu contraseña?</RouterLink>
            </div>
          </div>
          
          <label class="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" v-model="remember"
                   class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500">
            Recordarme
          </label>

          <p v-if="formError || auth?.error"
             class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {{ formError || auth?.error }}
          </p>

          <button type="submit" :disabled="isDisabled"
            class="w-full rounded-full py-3 font-extrabold tracking-wide text-white btn-login-grad
                  hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed">
            INGRESAR 🚀
          </button>
        </form>
      </div>

      <p class="auth-switch text-center text-sm text-slate-600 mt-4">
        ¿Aún no tienes una cuenta?
        <RouterLink to="/register" class="text-emerald-700 font-semibold hover:underline">Regístrate aquí</RouterLink>
      </p>
    </div>
  </section>
</template>
<style scoped>
.auth-wrapper{padding-bottom:35px;}
</style>
