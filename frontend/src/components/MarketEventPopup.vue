<script setup>
import {computed, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useKioscoStore} from '@/stores/useKioscoStore'

const s=useKioscoStore()
const {marketEvent}=storeToRefs(s)

const show=computed(()=>!!marketEvent.value)
const message=computed(()=>marketEvent.value?.message ?? 'Evento del mercado')

function close(){ s.clearMarketEvent?.(); marketEvent.value=null }

let t
watch(marketEvent,(v)=>{
  // debug: ver si llega el evento
  console.log('popup show =',!!v, v)
  if(v){ clearTimeout(t); t=setTimeout(close,4000) }
})

</script>

<template>
  <teleport to="body">
    <div v-if="show"
         style="
          position:fixed; top:56px; left:50%; transform:translateX(-50%);
          z-index:9999; max-width:640px; width:92vw;
          background:#fff; color:#0f172a; border-radius:16px;
          box-shadow:0 12px 30px rgba(0,0,0,.18);
          border:1px solid rgba(0,0,0,.1); padding:14px;">
      <div style="display:flex; gap:12px; align-items:flex-start">
        <div style="font-size:22px">📈</div>
        <div style="flex:1">
          <p style="margin:0; font-weight:700">Evento de Mercado</p>
          <p style="margin:2px 0 0; opacity:.8">{{ message }}</p>
        </div>
        <button @click="close">Cerrar</button>
      </div>
    </div>
  </teleport>
</template>
