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

  // Initialize 3D Tilt Effect
  init3dTilt();
});

// 3D Tilt Card Effect
function init3dTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate rotation based on cursor position relative to card center
      // Max rotation of 12 degrees
      const maxRotate = 12;
      const rotateY = ((x / width) - 0.5) * maxRotate * 2;
      const rotateX = -((y / height) - 0.5) * maxRotate * 2;
      
      // Apply transform and smooth lighting shadow shift
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
      
      // Add subtle inner glow shifting based on pointer
      const glowX = ((x / width) * 100);
      const glowY = ((y / height) * 100);
      card.style.setProperty('--glow-x', `${glowX}%`);
      card.style.setProperty('--glow-y', `${glowY}%`);
    });
    
    card.addEventListener('mouseleave', () => {
      // Smoothly reset transformations on mouse leave
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    });
  });
}

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