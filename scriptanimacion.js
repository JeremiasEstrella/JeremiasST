document.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.animate');

  elements.forEach(function(element) {
    var position = element.getBoundingClientRect();

    // Si el elemento está visible en la pantalla
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('visible'); // Muestra el elemento
    } else {
      element.classList.remove('visible'); // Oculta el elemento cuando no está en vista
    }
  });
});



document.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.animateslideleft ');

  elements.forEach(function(element) {
    var position = element.getBoundingClientRect();

    // Si el elemento está visible en la pantalla
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('visible2'); // Muestra el elemento
    } else {
      element.classList.remove('visible2'); // Oculta el elemento cuando no está en vista
    }
  });
});



document.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.animateslideright');

  elements.forEach(function(element) {
    var position = element.getBoundingClientRect();

    // Si el elemento está visible en la pantalla
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('visible3'); // Muestra el elemento
    } else {
      element.classList.remove('visible3'); // Oculta el elemento cuando no está en vista
    }
  });
});

function openModal() {
  document.getElementById("modalForm").style.display = "flex";
}

function closeModal() {
  document.getElementById("modalForm").style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
  var modal = document.getElementById("modalForm");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}