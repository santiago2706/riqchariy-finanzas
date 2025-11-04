/**
 * Simula una API de autenticación
 */

export const login = async (email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // 1. OBTENER USUARIOS REGISTRADOS Y USUARIO FIJO
    const fakeUsers = JSON.parse(localStorage.getItem("fakeUsers") || "[]");

    // 2. BUSCAR AL USUARIO EN EL ARREGLO REGISTRADO
    const registeredUser = fakeUsers.find(
        user => user.email === email && user.password === password
    );

    let foundUser = null;

    // 3. PRIORIZAR EL USUARIO REGISTRADO
    if (registeredUser) {
        foundUser = registeredUser;
    }
    // 4. FALLBACK: Usar el usuario Demo Fijo si las credenciales coinciden
    else if (email === "demo@example.com" && password === "password123") {
        // Asegúrate de que este usuario demo tenga los campos de role y level
        foundUser = {
            id: 1,
            email,
            name: "Usuario Demo",
            region: "Lima",
            role: "Estudiante", // CRÍTICO: Añadir el rol
            level: null
        };
    }


    // 5. VALIDACIÓN Y RESPUESTA
    if (foundUser) {
        return {
            success: true,
            user: {
                ...foundUser,
                role: foundUser.role || 'Estudiante',
                level: foundUser.level || null
            },
            token: "fake-jwt-token-" + Date.now(),
            message: "Login exitoso"
        };
    }

    return {
        success: false,
        message: "Credenciales incorrectas"
    };
};

export const register = async (userData) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Guardar usuario simulado en localStorage para que luego pueda loguearse
    const users = JSON.parse(localStorage.getItem("fakeUsers") || "[]");

    // ⚠️ ¡ARREGLO! Guardamos TODOS los userData (incluyendo role, region)
    const newUser = {
        id: Date.now(),
        ...userData,
        level: null // Al registrar, no tienen nivel asignado
    };

    users.push(newUser);
    localStorage.setItem("fakeUsers", JSON.stringify(users));


    return {
        success: true,
        user: newUser,
        token: "fake-jwt-token-" + Date.now(),
        message: "Registro exitoso"
    };
};
