// utils/validations.ts

/**
 * Valida que el texto solo contenga letras y espacios.
 * Ideal para Nombres y Apellidos. No permite números ni símbolos raros.
 */
export const esNombreValido = (nombre: string): boolean => {
    // Expresión regular: solo letras (incluyendo acentos y ñ) y espacios.
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre.trim());
};

/**
 * Valida que el DNI contenga solo números y tenga entre 7 y 8 dígitos.
 */
export const esDniValido = (dni: string): boolean => {
    const regex = /^\d{7,8}$/;
    return regex.test(dni.trim());
};

/**
 * Valida que el formato del correo electrónico sea correcto.
 */
export const esEmailValido = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
};
/**
 * Valida que el teléfono tenga un formato aceptable.
 * Permite números, espacios, guiones y el signo +.
 */
export const esTelefonoValido = (telefono: string): boolean => {
    const regex = /^[0-9+\s\-]{8,15}$/;
    return regex.test(telefono.trim());
};
/**
 * Valida que la fecha tenga formato DD/MM/YYYY
 */
export const esFormatoFechaValido = (fecha: string): boolean => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    return regex.test(fecha.trim());
};

/**
 * Función interna para calcular la edad exacta en años a partir de un string DD/MM/YYYY
 */
const calcularEdad = (fecha: string): number => {
    const [dia, mes, anio] = fecha.split('/');
    const fechaNacimiento = new Date(Number(anio), Number(mes) - 1, Number(dia));
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    // Si todavía no cumplió años este año, le restamos 1
    if (mesActual < fechaNacimiento.getMonth() || (mesActual === fechaNacimiento.getMonth() && diaActual < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
};

/**
 * Valida que la edad de un alumno esté entre 5 y 20 años
 */
export const esEdadAlumnoValida = (fecha: string): boolean => {
    if (!esFormatoFechaValido(fecha)) return false;
    const edad = calcularEdad(fecha);
    return edad >= 5 && edad <= 20;
};

/**
 * Valida que la edad de un tutor sea mayor o igual a 18 años
 */
export const esEdadTutorValida = (fecha: string): boolean => {
    if (!esFormatoFechaValido(fecha)) return false;
    const edad = calcularEdad(fecha);
    return edad >= 18;
};