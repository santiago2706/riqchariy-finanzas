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
                name: "Usuario Demo",
                region: "Lima",//Acá iría la region del usuario traido del Api
                level: "semilla"//Acá iría el nivel del usuario traido del Api
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
    users.push(userData);
    localStorage.setItem("fakeUsers", JSON.stringify(users));


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
