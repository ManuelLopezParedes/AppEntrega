import { registrar } from "./services/api.js";

function getElements() {
  return {
    btn: document.getElementById("btnEnviar"),
    spinner: document.getElementById("spinner"),
    nombres: document.getElementById("nombres"),
    primerApellido: document.getElementById("primerApellido"),
    segundoApellido: document.getElementById("segundoApellido"),
    fechaNacimiento: document.getElementById("fechaNacimiento"),
    sexo: document.getElementById("sexo"),
    cp: document.getElementById("cp"),
    direccion: document.getElementById("direccion"),
    telefono: document.getElementById("telefono"),
    correo: document.getElementById("correo"),
    contraseña: document.getElementById("contraseña"),
    alias: document.getElementById("alias")
  };
}

function getFormData() {
  const {
    nombres,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    direccion,
    cp,
    telefono,
    correo,
    contraseña,
    alias
  } = getElements();

  return {
    nombres: nombres.value,
    primerApellido: primerApellido.value,
    segundoApellido: segundoApellido.value,
    fechaNacimiento: fechaNacimiento.value,
    sexo: sexo.value,
    cp: cp.value,
    direccion: direccion.value, 
    telefono: telefono.value,
    correo: correo.value,
    contraseña: contraseña.value,
    alias: alias.value
  };
}

async function handleRegistro(event) {
  if (event) event.preventDefault();

  const { btn, spinner } = getElements();

  spinner.style.display = "inline-block";
  btn.disabled = true;

  try {
    const data = getFormData();

    const result = await registrar(data);

    console.log(result);
    alert("Cuenta creada");

    window.location.href = "inicioSesion.html";
  } catch (error) {
    console.error("Error en el registro:", error);
    alert(`Fallo en el registro: ${error.message}`);
  } finally {
    spinner.style.display = "none";
    btn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const { btn } = getElements();

  if (btn) {
    btn.addEventListener("click", handleRegistro);
  }
});
