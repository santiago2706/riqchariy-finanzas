/**
 * Simula una API de autenticación
 */

export const login = async (email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulación de validación
    if (email === "demo@example.com" && password === "password123") {
        return {
            success: true,
            user: {
                id: 1,
                email,
<<<<<<< HEAD
                name: "Usuario Demo"
=======
                name: "Usuario Demo",
                region: "Lima",//Acá iría la region del usuario traido del Api
                level: "semilla"//Acá iría el nivel del usuario traido del Api
>>>>>>> 0377930 (feat: Versión inicial con vista de kiosco funcional)
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

    return {
        success: true,
        user: {
            id: Date.now(),
            ...userData
        },
        token: "fake-jwt-token-" + Date.now(),
        message: "Registro exitoso"
    };
};
