const btnUsers = document.getElementById("btnUsers");
const btnBooks = document.getElementById("btnBooks");
const loader = document.getElementById("loader");
const content = document.getElementById("content");

const API_BASE = "http://localhost:3000";

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function clearContent() {
  content.innerHTML = "";
}

function createUserCard(user) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>

    <p><strong>Colección de libros:</strong></p>
    <ul>
      ${
        user.collection && user.collection.length
          ? user.collection
              .map((book) => `<li>${book.title} (${book.author})</li>`)
              .join("")
          : "<li>No tiene libros en la colección.</li>"
      }
    </ul>

    <p><strong>Wishlist:</strong></p>
    <ul>
      ${
        user.wishlist && user.wishlist.length
          ? user.wishlist
              .map((book) => `<li>${book.title} (${book.author})</li>`)
              .join("")
          : "<li>No tiene libros en la wishlist.</li>"
      }
    </ul>
  `;

  return div;
}

function createBookCard(book) {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <img src="${book.image}" alt="Portada de ${book.title}" />
    <h2>${book.title}</h2>
    <p><strong>Autor:</strong> ${book.author}</p>
    <p><strong>Publicado:</strong> ${book.publishedDate || "Desconocida"}</p>
  `;

  return div;
}

btnUsers.addEventListener("click", async () => {
  clearContent();
  showLoader();
  try {
    const res = await fetch(`${API_BASE}/users`);
    const users = await res.json();

    if (!Array.isArray(users) || users.length === 0) {
      content.textContent = "No hay usuarios para mostrar.";
      return;
    }

    users.forEach((user) => {
      content.appendChild(createUserCard(user));
    });
  } catch (error) {
    content.textContent = "Error al obtener usuarios.";
  } finally {
    hideLoader();
  }
});

btnBooks.addEventListener("click", async () => {
  clearContent();
  showLoader();
  try {
    const res = await fetch(`${API_BASE}/books`);
    const books = await res.json();

    if (!Array.isArray(books) || books.length === 0) {
      content.textContent = "No hay libros para mostrar.";
      return;
    }

    books.forEach((book) => {
      content.appendChild(createBookCard(book));
    });
  } catch (error) {
    content.textContent = "Error al obtener libros.";
  } finally {
    hideLoader();
  }
});
