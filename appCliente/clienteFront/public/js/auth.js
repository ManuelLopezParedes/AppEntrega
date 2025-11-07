// Espera a que el contenido de la página se cargue
document.addEventListener("DOMContentLoaded", function () {
  // 1. Obtener los elementos de la navbar
  const loginLink = document.getElementById("inicioSesion");
  const registerLink = document.getElementById("registrarse");
  const perfilLink = document.getElementById("perfil");
  const carritoLink = document.getElementById("carrito");
  const logoutLink = document.getElementById("cerrarSesion");
  const direcciones = document.getElementById("direcciones")

  // 2. Revisar si el token existe en localStorage
  const token = localStorage.getItem("token");

  if (token) {
    // Si hay token (usuario logueado):
    // Ocultamos "Iniciar Sesión" y "Registrarse"
    loginLink.classList.add("d-none");
    registerLink.classList.add("d-none");

    // Mostramos "Perfil", "Carrito" y "Cerrar Sesión"
    perfilLink.classList.remove("d-none");
    carritoLink.classList.remove("d-none");
    direcciones.classList.remove("d-none")
  }
  // No necesitamos un 'else' porque el estado por defecto (HTML)
  // ya es el de "invitado".

  // 3. (IMPORTANTE) Añadir lógica para "Cerrar Sesión"
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir que el enlace navegue

    // Eliminar el token
    localStorage.removeItem("token");

    // Opcional: Limpiar también el carrito local si existe
    localStorage.removeItem("carrito");

    // Redirigir al inicio de sesión
    window.location.href = "index.html";
  });
});
