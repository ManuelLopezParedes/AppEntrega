import { iniciarSesion } from "./services/api.js";

function getElements() {
  return {
    spinner: document.getElementById("spinner"),
    messageDiv: document.getElementById("message"),
    correoInput: document.getElementById("correo"),
    contrasenaInput: document.getElementById("contraseña"),
    enviarButton: document.getElementById("btnEnviar"),
    registrarButton: document.getElementById("btnRegistrar"),
  };
}

function showLoading(spinner, messageDiv) {
  spinner.style.display = "inline-block";
  messageDiv.classList.add("d-none");
  messageDiv.classList.remove("alert-danger", "alert-success");
}

function showResult(messageDiv, success, message) {
  messageDiv.textContent = message;
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add(success ? "alert-success" : "alert-danger");
}

function hideLoading(spinner) {
  spinner.style.display = "none";
}

// --- Manejo del Evento Principal ---

async function handleLogin(event) {
  event.preventDefault(); // Evita el envío tradicional del formulario (si usas <form>)

  const { spinner, messageDiv, correoInput, contrasenaInput } = getElements();

  showLoading(spinner, messageDiv);

  try {
    const correo = correoInput.value;
    const contraseña = contrasenaInput.value;

    const result = await iniciarSesion(correo, contraseña);

    console.log(result);
    localStorage.setItem("token", result.token);
    showResult(messageDiv, true, "Inicio de sesión exitoso. Redirigiendo...");

    window.location.href = "index.html";
  } catch (error) {

    console.error("Error en el login:", error);

    showResult(
      messageDiv,
      false,
      error.message || "Ocurrió un error inesperado."
    );
  } finally {
    hideLoading(spinner);
  }
}

function handleRegistration() {
  window.location.href = "registro.html";
}

// --- Inicialización: Asignar Event Listeners ---

document.addEventListener("DOMContentLoaded", () => {
  const { enviarButton, registrarButton } = getElements();

  if (enviarButton) {
    enviarButton.addEventListener("click", handleLogin);
  }

  if (registrarButton) {
    registrarButton.addEventListener("click", handleRegistration);
  }
});
