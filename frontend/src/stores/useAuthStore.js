import {ref} from 'vue';
import {defineStore} from 'pinia';
import {login as apiLogin, register as apiRegister} from '../services/authApi.js';
import router from '../router/index.js';
import {useKioscoStore} from './useKioscoStore';
import {useMarketStore} from './useMarketStore';
import {fetchGameState} from '../services/transactionApi.js';

export const useAuthStore = defineStore('auth', () => {
const getSavedUser = () => {
try {
const savedUser = localStorage.getItem('user');
return savedUser ? JSON.parse(savedUser) : null;
} catch (error) {
console.error('Error al parsear el usuario del localStorage:', error);
localStorage.removeItem('user');
return null;
}
};

const user = ref(getSavedUser());
const token = ref(localStorage.getItem('token'));

async function login(email, password) {
try {
const response = await apiLogin(email, password);
if (response.success) {
user.value = response.user;
token.value = response.token;
localStorage.setItem('user', JSON.stringify(response.user));
localStorage.setItem('token', response.token);

try {
console.log('[Auth Store]: Login exitoso. Cargando datos del juego...');
const savedState = await fetchGameState();
const kioscoStore = useKioscoStore();
const marketStore = useMarketStore();
kioscoStore.loadState(savedState.inventario, savedState.saldo, savedState.day);
marketStore.loadState(savedState.day);
} catch (loadError) {
console.error('Error al cargar el estado del juego:', loadError);
}

router.push({name: 'dashboard'});
return true;
} else {
console.log(response.message);
return false;
}
} catch (error) {
console.error('Error en login:', error);
console.log('Hubo un error al iniciar sesión.');
return false;
}
}

async function register(userData) {
try {
const response = await apiRegister(userData);
if (response.success) {
console.log('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
router.push({name: 'login'});
return true;
} else {
console.log(response.message || 'Error al registrar el usuario.');
return false;
}
} catch (error) {
console.error('Error en register:', error);
console.log('Hubo un problema al registrar la cuenta.');
return false;
}
}

function logout() {
user.value = null;
token.value = null;
localStorage.removeItem('user');
localStorage.removeItem('token');
router.push({name: 'login'});
}

return {
user,
token,
login,
register,
logout
};
});
