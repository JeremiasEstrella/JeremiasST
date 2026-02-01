document.addEventListener('scroll', function() {
  function handleScrollAnimation(selector, activeClass) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function(element) {
      var position = element.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add(activeClass);
      } else {
        element.classList.remove(activeClass);
      }
    });
  }

  // Run on scroll
  handleScrollAnimation('.animate', 'visible');
  handleScrollAnimation('.animateslideleft', 'visible2');
  handleScrollAnimation('.animateslideright', 'visible3');
});

// Run immediately on load to catch elements already in viewport
document.addEventListener('DOMContentLoaded', function() {
  // We need to define the function here or make it global/shared. 
  // For simplicity, let's duplicate the logic or restructure. A shared event handler is better.
  function checkAnimations() {
     function handle(selector, activeClass) {
        document.querySelectorAll(selector).forEach(function(element) {
          var position = element.getBoundingClientRect();
          if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add(activeClass);
          }
        });
     }
     handle('.animate', 'visible');
     handle('.animateslideleft', 'visible2');
     handle('.animateslideright', 'visible3');
  }
  
  // Checking a few times to ensure layout is settled
  checkAnimations();
  setTimeout(checkAnimations, 100); 
  setTimeout(checkAnimations, 500); 

  // Mobile Menu Logic
  const iconoMenu = document.getElementById("icono_menu");
  const menu = document.querySelector("nav");

  if (iconoMenu && menu) {
      iconoMenu.addEventListener("click", function() {
          menu.classList.toggle("show-menu");
      });
  }
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