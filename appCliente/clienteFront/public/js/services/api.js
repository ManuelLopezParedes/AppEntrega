import { URL, LOGIN, REGISTER, CATEGORIAS, PRODUCTOS } from "../config/url.js";

export async function iniciarSesion(correo, contraseña) {
  const url = `${URL}${LOGIN}`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ correo, contraseña });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  const result = await response.json();
  return result;
}

export async function registrar(data) {
  const url = `${URL}${REGISTER}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Error al registrar. Código: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function obtenerCategorias() {
  const url = `${URL}${CATEGORIAS}`;

  const requestOptions = { method: "GET", redirect: "follow" };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error HTTP al obtener categorías: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fallo en obtenerCategorias:", error);
    throw error;
  }
}

export async function obtenerProductosPorCategoria(idCategoria) {
  const url = `${URL}${PRODUCTOS}/${idCategoria}`;

  const requestOptions = { method: "GET", redirect: "follow" };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error HTTP al obtener productos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Fallo en obtenerProductosPorCategoria (${idCategoria}):`,
      error
    );
    throw error;
  }
}