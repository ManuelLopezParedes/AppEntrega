import {
  obtenerCategorias,
  obtenerProductosPorCategoria,
} from "./services/api.js";
import { URL } from "./config/url.js"; // Necesario para la URL de las imágenes

const accordionContainer = document.getElementById("menu");

// ------------------------ Funciones de Renderizado ----------------------------------

/**
 * Crea el HTML de la tarjeta de un producto.
 */
function createProductCardHTML(element) {
  // Usamos BASE_URL para construir la URL completa de la imagen
  const imageUrl = `${URL}${element.imagen}`;
  const precio = parseFloat(element.precio).toFixed(2);

  return `
        <div class="col-md-4 col-lg-3 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${imageUrl}" class="card-img-top" alt="${element.nombre}" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${element.nombre}</h5>
              <p class="card-text small text-muted">${element.descripcion}</p>
              <p class="card-text fw-bold mt-auto text-success">$${precio}</p>
              <a href="#" class="btn btn-primary btn-sm mt-2" data-product-id="${element.id}">Agregar</a>
            </div>
          </div>
        </div>
    `;
}

/**
 * Inserta los productos en el contenedor de la categoría.
 */
async function renderProductos(idCategoria, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const result = await obtenerProductosPorCategoria(idCategoria);

    container.innerHTML = "";

    if (result.length === 0) {
      container.innerHTML =
        "<p class='text-muted'>No hay productos en esta categoría.</p>";
      return;
    }

    result.forEach((product) => {
      container.insertAdjacentHTML("beforeend", createProductCardHTML(product));
    });
  } catch (error) {
    console.error(
      `Error al cargar productos de la categoría ${idCategoria}:`,
      error
    );
    container.innerHTML =
      "<p class='text-danger'>Error al cargar los productos.</p>";
  }
}

function createCategoryItemHTML(category) {
  const idPanel = `collapseCategoria${category.id}`;
  const idTitulo = `headingCategoria${category.id}`;
  const idContainerProductos = `productos-cat-${category.id}`;

  return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="${idTitulo}">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#${idPanel}"
                    aria-expanded="false"
                    aria-controls="${idPanel}"
                >
                    <strong>${category.categoria}</strong>
                </button>
            </h2>
            <div
                id="${idPanel}"
                class="accordion-collapse collapse"
                aria-labelledby="${idTitulo}"
                data-bs-parent="#menu" 
            >
                <div class="accordion-body">
                    <div class="row" id="${idContainerProductos}">
                        Cargando productos...
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ------------------------ Función de Orquestación ----------------------------------
async function cargarTodo() {
  if (!accordionContainer) return;

  try {
    const categorias = await obtenerCategorias();

    accordionContainer.innerHTML = ""; // Limpiar

    categorias.forEach((category) => {
      // 1. Renderizar el acordeón
      const idContainerProductos = `productos-cat-${category.id}`;
      accordionContainer.insertAdjacentHTML(
        "beforeend",
        createCategoryItemHTML(category)
      );

      // 2. Cargar los productos para la categoría recién insertada (asíncrono)
      renderProductos(category.id, idContainerProductos);
    });
  } catch (error) {
    console.error("Error crítico al cargar categorías:", error);
    accordionContainer.innerHTML =
      "<div class='alert alert-danger'>No se pudieron cargar las categorías del menú. Intente más tarde.</div>";
  }
}

// --- Inicialización: Ejecutar al cargar el DOM ---
document.addEventListener("DOMContentLoaded", cargarTodo);
