import{defineStore}from'pinia';
import{useAuthStore}from'../stores/useAuthStore';
import{API_URL}from"../config/api";
export const useMarketStore=defineStore('market',{
    state:() => ({
        day:1,
        products:[],
        isUpdating:false,
        marketEvent:null
    }),
    actions:{
        /**
         * ACCIÓN 1: Pide al backend la lista inicial de productos.
         */
        async fetchInitialProducts(){
            if(this.products.length > 0)return;
            console.log("[Frontend] Pidiendo productos iniciales al backend...");
            this.isUpdating=true;
            try{
                const authStore=useAuthStore();
                if(!authStore.user||!authStore.user.region){
                    throw new Error('No se pudo determinar la región del usuario para cargar el mercado.');
                }
                let region=authStore.user.region;
                // 🛑 CORRECCIÓN CLAVE: Simplificar la región (ej: "Lima (Costa)" -> "Lima") antes de la llamada a la API
                const regionSimple=region.split(' ')[0];
                // Usamos la región simplificada para la consulta GET
                const response=await fetch(`${API_URL}/api/productos/iniciales?region=${encodeURIComponent(regionSimple)}`);
                if(!response.ok){
                    throw new Error(`No se pudieron cargar los productos iniciales (Error: ${response.status})`);
                }
                const initialProducts=await response.json();
                // Usamos la región original para el log de la consola si es necesario, pero la simple es la que funcionó
                console.log(`[Frontend] Productos iniciales recibidos para ${regionSimple}:`,initialProducts);
                // Si KioscoStore usa esta función, debemos devolver los productos
                this.products=initialProducts;
            }catch(error){
                console.error("Error al cargar productos iniciales:",error);
            }finally{
                this.isUpdating=false;
            }
        },
        /**
         * ACCIÓN 2: El motor del juego. Llama al backend para avanzar un día.
         */
        async advanceDay(){
            if(this.isUpdating){
                console.log("¡Espera! El mercado ya se está actualizando.");
                return;
            }
            this.isUpdating=true;
            this.marketEvent=null;
            try{
                const estadoActual={
                    dia_actual:this.day,
                    products:this.products
                };
                const response=await fetch(`${API_URL}/api/mercado/avanzar-dia`,{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(estadoActual)
                });
                if(!response.ok){
                    throw new Error('Error en la respuesta del backend');
                }
                const nuevoEstadoDesdeBackend=await response.json();
                this.day=nuevoEstadoDesdeBackend.nuevo_dia;
                this.marketEvent=nuevoEstadoDesdeBackend.evento_regional;
                this.products=nuevoEstadoDesdeBackend.products;
                console.log(`¡Día ${this.day} avanzado por el BACKEND!`);
            }catch(error){
                console.error("Error al contactar el Motor del Mercado:",error);
            }finally{
                this.isUpdating=false;
            }
        },
        /**
         * ACCIÓN 3: Pide al backend una partida guardada.
         */
        async loadGame(){
            console.log("[Frontend] Cargando partida guardada desde el backend...");
            this.isUpdating=true;
            try{
                const authStore=useAuthStore();
                if(!authStore.user||!authStore.user.region){
                    throw new Error('No se pudo determinar la región del usuario para cargar la partida.');
                }
                let region=authStore.user.region;
                // 🛑 CORRECCIÓN CLAVE: Simplificar la región para la llamada
                const regionSimple=region.split(' ')[0];
                const response=await fetch(`${API_URL}/api/game/load?region=${encodeURIComponent(regionSimple)}`);
                if(!response.ok){
                    throw new Error(`No se pudo cargar la partida (Error: ${response.status})`);
                }
                const gameState=await response.json();
                this.day=gameState.day;
                this.products=gameState.inventario.map(item => item.product);
                this.marketEvent=gameState.marketEvent;
                console.log(`[Frontend] Partida cargada (simulada por backend). Día ${this.day}.`);
            }catch(error){
                console.error("Error al cargar partida:",error);
            }finally{
                this.isUpdating=false;
            }
        },
        // Función agregada solo para compatibilidad, aunque ya se maneja en KioscoStore
        setProducts(productsWithHistory){
            this.products=productsWithHistory;
        }
    },
    getters:{
        productCount:(state) => state.products.length,
    }
});
