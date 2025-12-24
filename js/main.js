// Aquest codi s'executarà quan tota la pàgina s'hagi carregat
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÒGICA PER AL MENÚ MÒBIL ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-nav'); 

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // --- 2. MARCAR L'ENLLAÇ DE NAVEGACIÓ ACTIU ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list .nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // --- 3. FUNCIONALITAT PER AL FORMULARI FLOTANT ---
    const contactBtn = document.querySelector('.contact-floating-btn');
    const contactFormContainer = document.querySelector('.floating-contact-form');
    
    if (contactBtn && contactFormContainer) {
        const closeForm = contactFormContainer.querySelector('.close-form');
        const floatingForm = document.getElementById('floatingContactForm');

        contactBtn.addEventListener('click', function() {
            contactFormContainer.classList.add('active');
        });
        
        if (closeForm) {
            closeForm.addEventListener('click', function() {
                contactFormContainer.classList.remove('active');
            });
        }
        
        document.addEventListener('click', function(e) {
            if (contactFormContainer.classList.contains('active') && !contactFormContainer.contains(e.target) && !contactBtn.contains(e.target)) {
                contactFormContainer.classList.remove('active');
            }
        });
        
        contactFormContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        if (floatingForm) {
            floatingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Gracias por su mensaje. Le responderemos pronto.');
                this.reset();
                contactFormContainer.classList.remove('active');
            });
        }
    }


    // --- 4. CODI PER AL PERFIL EMERGENT (MODAL) ---
    const openModalBtn = document.getElementById('openProfileModal');
    const profileModal = document.getElementById('profileModal');
    
    if (openModalBtn && profileModal) {
        const closeModalBtn = profileModal.querySelector('.close-modal');
        
        openModalBtn.addEventListener('click', function() {
            profileModal.style.display = 'flex';
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                profileModal.style.display = 'none';
            });
        }

        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }


    // --- 5. LÒGICA PER AL FORMULARI DE LA PÀGINA DE CONTACTE ---
    const mainContactForm = document.getElementById('contactForm');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Formulari de la pàgina de contacte enviat!');
            mainContactForm.reset();
        });
    }


    // --- 6. ANIMACIONS EN FER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate__animated');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => el.style.opacity = '1');
    }

    // --- 7. LÒGICA PER A L'ENLLAÇ EXTERN DEL BLOG ---
    const handleExternalLink = function(event) {
        event.preventDefault();
        const url = event.currentTarget.href;
        window.open(url, '_blank');
    };

    const blogLinkHeader = document.getElementById('blog-link-header');
    const blogLinkFooter = document.getElementById('blog-link-footer');

    if (blogLinkHeader) {
        blogLinkHeader.addEventListener('click', handleExternalLink);
    }

    if (blogLinkFooter) {
        blogLinkFooter.addEventListener('click', handleExternalLink);
    }
    
    // --- 8. EFECTE NEU (NOU!) ---
    // Comprovem que la llibreria existeix abans d'activar-la per evitar errors
    if (window.Snowflakes) {
        new Snowflakes({
            color: '#ffffff', // Color blanc
            count: 25,        // Nombre de flocs
            minOpacity: 0.2,
            maxOpacity: 0.7
        });
    }

});