function toggleMobileMenu() {
          const mobileNav = document.getElementById('mobileNav');
          const menuBtn = document.querySelector('.mobile-menu-btn');
          
          mobileNav.classList.toggle('active');
          menuBtn.classList.toggle('active');
      }

      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
          const mobileNav = document.getElementById('mobileNav');
          const menuBtn = document.querySelector('.mobile-menu-btn');
          
          if (!menuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
              mobileNav.classList.remove('active');
              menuBtn.classList.remove('active');
          }
      });

      // Close mobile menu on window resize
      window.addEventListener('resize', function() {
          if (window.innerWidth > 640) {
              const mobileNav = document.getElementById('mobileNav');
              const menuBtn = document.querySelector('.mobile-menu-btn');
              mobileNav.classList.remove('active');
              menuBtn.classList.remove('active');
          }
      });