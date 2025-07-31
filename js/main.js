document.addEventListener('DOMContentLoaded', function() {
    // Menú mòbil
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuButton && navList) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Inicialitzar idioma
    initLanguage();

    // Selector d'idiomes (header)
    const languageButtons = document.querySelectorAll('.language-button');
    const languageDropdowns = document.querySelectorAll('.language-dropdown');

    languageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            languageDropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('show');
            });
            
            dropdown.classList.toggle('show');
        });
    });

    // Selector d'idiomes (footer)
    document.querySelectorAll('.footer-language .language-dropdown a').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Selecció d'idioma
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Tanca dropdowns en fer clic fora
    document.addEventListener('click', function() {
        languageDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });

    // Marca l'enllaç actiu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Formulari de contacte
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + submitBtn.textContent;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> ' + originalText;
                    
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p data-translate="form_success">Gràcies pel vostre missatge. Ens posarem en contacte amb vostè aviat.</p>
                    `;
                    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        successMessage.remove();
                    }, 3000);
                }, 1500);
            } else {
                const errorElement = document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span data-translate="form_error">Si us plau, ompli tots els camps obligatoris.</span>';
                
                const existingError = contactForm.querySelector('.form-error');
                if (existingError) existingError.remove();
                
                contactForm.insertBefore(errorElement, contactForm.firstChild);
                
                setTimeout(() => {
                    errorElement.remove();
                }, 5000);
            }
        });
    }

    // Animacions al fer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                if (element.classList.contains('animate__fadeInUp')) {
                    element.style.transform = 'translateY(0)';
                }
            }
        });
    }

    // Inicialitzar elements amb animació
    document.querySelectorAll('.animate__animated').forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('animate__fadeInUp')) {
            element.style.transform = 'translateY(20px)';
        }
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Executar al carregar i al fer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Actualitzar enllaços amb idioma
    updateLinksWithLanguage();
});

// Gestionar canvis d'historial
window.addEventListener('popstate', function() {
    initLanguage();
});

// Funcions d'idioma
function initLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.substring(0, 2);
    const defaultLang = 'ca';

    const langToApply = langParam || savedLang || (['ca','es','en'].includes(browserLang) ? browserLang : defaultLang);
    applyLanguage(langToApply);
    updateLanguageSelector(langToApply);
}

function changeLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
    updateLanguageSelector(lang);
    
    // Actualitzar la URL sense recarregar
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
}

function applyLanguage(lang) {
    const translations = {
        'ca': {
            'home': 'Inici',
            'services': 'Serveis',
            'about': 'Sobre Nosaltres',
            'blog': 'Blog',
            'contact': 'Contacte',
            'hero_title': 'Solucions estratègiques per al seu negoci',
            'hero_subtitle': 'Més de 15 anys d\'experiència en consultoria empresarial',
            'contact_us': 'Contacti\'ns',
            'our_services': 'Els Nostres Serveis',
            'services_subtitle': 'Solucions integrals per a la seva empresa',
            'more_info': 'Més informació',
            'all_services': 'Veure tots els serveis',
            'about_title': 'Sobre Nosaltres',
            'about_text1': 'VS Consultores Corporativos és una empresa especialitzada en consultoria estratègica amb més de 15 anys d\'experiència ajudant a empreses a assolir els seus objectius de negoci.',
            'about_text2': 'El nostre equip de professionals altament qualificats ofereix solucions personalitzades per a cada client, adaptant-nos a les seves necessitats específiques i al seu entorn empresarial.',
            'more_about': 'Més sobre nosaltres',
            'our_team': 'El Nostre Equip',
            'ceo_title': 'Fundadora i CEO',
            'ceo_desc': 'Amb més de 20 anys d\'experiència en consultoria fiscal i estratègica.',
            'view_profile': 'Veure perfil',
            'our_history': 'La Nostra Història',
            'history_text1': 'VS Consultores Corporativos va ser fundada el 2005 per Valeria Valdés Sánchez amb la visió de proporcionar assessorament fiscal i empresarial d\'alta qualitat a les empreses de la regió.',
            'history_text2': 'Des dels nostres inicis a Orizaba, Veracruz, hem crescut fins a convertir-nos en un referent en consultoria estratègica, ampliant els nostres serveis i el nostre equip per atendre les necessitats dels nostres clients.',
            'history_text3': 'Avui som un equip de professionals compromesos amb l\'excel·lència i la satisfacció del client.',
            'our_values': 'Els Nostres Valors',
            'value1_title': 'Compromís',
            'value1_desc': 'Amb els nostres clients i el seu èxit empresarial.',
            'value2_title': 'Integritat',
            'value2_desc': 'Actuem sempre amb ètica i transparència.',
            'value3_title': 'Innovació',
            'value3_desc': 'Busquem solucions creatives i efectives.',
            'value4_title': 'Treball en Equip',
            'value4_desc': 'Col·laborem per assolir objectius comuns.',
            'blog_title': 'Blog',
            'blog_subtitle': 'Actualitat fiscal i consells per a la vostra empresa',
            'post1_title': 'Reformes Fiscals 2023: Què ha de saber la seva empresa',
            'post1_excerpt': 'Les principals modificacions a la legislació fiscal que afecten a les empreses aquest any i com preparar-se per al seu compliment.',
            'post2_title': 'Beneficis fiscals per a PIMES que pots aprofitar',
            'post2_excerpt': 'Descobreix els incentius fiscals disponibles per a petites i mitjanes empreses i com aplicar-los correctament.',
            'post3_title': 'Com la transformació digital pot optimitzar els vostres processos fiscals',
            'post3_excerpt': 'Eines i estratègies per digitalitzar la gestió fiscal de la vostra empresa i estalviar temps i recursos.',
            'published_by': 'Publicat per',
            'category_tax': 'Fiscal',
            'category_tech': 'Tecnologia',
            'read_more': 'Llegir més',
            'may': 'MAIG',
            'apr': 'ABR',
            'mar': 'MAR',
            'contact_title': 'Contacte',
            'contact_subtitle': 'Estem a la vostra disposició per a qualsevol consulta',
            'contact_info': 'Informació de Contacte',
            'office_hours': 'Dilluns a Divendres: 9:00 - 18:00',
            'contact_form': 'Formulari de Contacte',
            'full_name': 'Nom complet',
            'email': 'Correu electrònic',
            'phone': 'Telèfon',
            'service_interest': 'Servei d\'interès',
            'select_service': 'Selecciona un servei',
            'tax_consulting': 'Consultoria Fiscal',
            'payroll_management': 'Administració de Nòmines',
            'financial_audit': 'Auditoria Financera',
            'other_services': 'Altres consultories',
            'message': 'Missatge',
            'send_message': 'Enviar missatge',
            'form_success': 'Gràcies pel vostre missatge. Ens posarem en contacte amb vostè aviat.',
            'form_error': 'Si us plau, ompli tots els camps obligatoris.',
            'quick_links': 'Enllaços Ràpids',
            'footer_desc': 'Consultoria estratègica especialitzada des de 2005',
            'copyright': '2023 VS Consultores Corporativos. Tots els drets reservats.',
            'service1_title': 'Consultoria Fiscal',
            'service1_desc': 'Assessorament fiscal integral per al compliment oportú d\'obligacions.',
            'service1_feature1': 'Planificació fiscal estratègica',
            'service1_feature2': 'Declaracions mensuals i anuals',
            'service1_feature3': 'Assessorament en interpretació de normativa',
            'service1_feature4': 'Defensa fiscal davant autoritats',
            'service2_title': 'Administració de Nòmines',
            'service2_desc': 'Gestió completa de nòmines per a la seva empresa.',
            'service2_feature1': 'Càlcul i procés de nòmines',
            'service2_feature2': 'Control d\'assistències i incidències',
            'service2_feature3': 'Elaboració d\'IMSS i INFONAVIT',
            'service2_feature4': 'Reportos fiscals i financers',
            'service3_title': 'Auditoria Financera',
            'service3_desc': 'Revisió exhaustiva dels estats financers de la seva empresa.',
            'service3_feature1': 'Auditoria d\'estats financers',
            'service3_feature2': 'Revisió fiscal complementària',
            'service3_feature3': 'Avaluació de controls interns',
            'service3_feature4': 'Dictamen fiscal',
            'request_info': 'Sol·licitar informació',
            'language': 'Idioma'
        },
        'es': {
            'home': 'Inicio',
            'services': 'Servicios',
            'about': 'Sobre Nosotros',
            'blog': 'Blog',
            'contact': 'Contacto',
            'hero_title': 'Soluciones estratégicas para su negocio',
            'hero_subtitle': 'Más de 15 años de experiencia en consultoría empresarial',
            'contact_us': 'Contáctenos',
            'our_services': 'Nuestros Servicios',
            'services_subtitle': 'Soluciones integrales para su empresa',
            'more_info': 'Más información',
            'all_services': 'Ver todos los servicios',
            'about_title': 'Sobre Nosotros',
            'about_text1': 'VS Consultores Corporativos es una empresa especializada en consultoría estratégica con más de 15 años de experiencia ayudando a empresas a alcanzar sus objetivos de negocio.',
            'about_text2': 'Nuestro equipo de profesionales altamente cualificados ofrece soluciones personalizadas para cada cliente, adaptándonos a sus necesidades específicas y a su entorno empresarial.',
            'more_about': 'Más sobre nosotros',
            'our_team': 'Nuestro Equipo',
            'ceo_title': 'Fundadora y CEO',
            'ceo_desc': 'Con más de 20 años de experiencia en consultoría fiscal y estratégica.',
            'view_profile': 'Ver perfil',
            'our_history': 'Nuestra Historia',
            'history_text1': 'VS Consultores Corporativos fue fundada en 2005 por Valeria Valdés Sánchez con la visión de proporcionar asesoría fiscal y empresarial de alta calidad a las empresas de la región.',
            'history_text2': 'Desde nuestros inicios en Orizaba, Veracruz, hemos crecido hasta convertirnos en un referente en consultoría estratégica, ampliando nuestros servicios y nuestro equipo para atender las necesidades de nuestros clientes.',
            'history_text3': 'Hoy somos un equipo de profesionales comprometidos con la excelencia y la satisfacción del cliente.',
            'our_values': 'Nuestros Valores',
            'value1_title': 'Compromiso',
            'value1_desc': 'Con nuestros clientes y su éxito empresarial.',
            'value2_title': 'Integridad',
            'value2_desc': 'Actuamos siempre con ética y transparencia.',
            'value3_title': 'Innovación',
            'value3_desc': 'Buscamos soluciones creativas y efectivas.',
            'value4_title': 'Trabajo en Equipo',
            'value4_desc': 'Colaboramos para alcanzar objetivos comunes.',
            'blog_title': 'Blog',
            'blog_subtitle': 'Actualidad fiscal y consejos para su empresa',
            'post1_title': 'Reformas Fiscales 2023: Qué debe saber su empresa',
            'post1_excerpt': 'Las principales modificaciones a la legislación fiscal que afectan a las empresas este año y cómo prepararse para su cumplimiento.',
            'post2_title': 'Beneficios fiscales para PYMES que puedes aprovechar',
            'post2_excerpt': 'Descubre los incentivos fiscales disponibles para pequeñas y medianas empresas y cómo aplicarlos correctamente.',
            'post3_title': 'Cómo la transformación digital puede optimizar sus procesos fiscales',
            'post3_excerpt': 'Herramientas y estrategias para digitalizar la gestión fiscal de su empresa y ahorrar tiempo y recursos.',
            'published_by': 'Publicado por',
            'category_tax': 'Fiscal',
            'category_tech': 'Tecnología',
            'read_more': 'Leer más',
            'may': 'MAYO',
            'apr': 'ABR',
            'mar': 'MAR',
            'contact_title': 'Contacto',
            'contact_subtitle': 'Estamos a su disposición para cualquier consulta',
            'contact_info': 'Información de Contacto',
            'office_hours': 'Lunes a Viernes: 9:00 - 18:00',
            'contact_form': 'Formulario de Contacto',
            'full_name': 'Nombre completo',
            'email': 'Correo electrónico',
            'phone': 'Teléfono',
            'service_interest': 'Servicio de interés',
            'select_service': 'Selecciona un servicio',
            'tax_consulting': 'Consultoría Fiscal',
            'payroll_management': 'Administración de Nóminas',
            'financial_audit': 'Auditoría Financiera',
            'other_services': 'Otras consultorías',
            'message': 'Mensaje',
            'send_message': 'Enviar mensaje',
            'form_success': 'Gracias por su mensaje. Nos pondremos en contacto con usted pronto.',
            'form_error': 'Por favor, complete todos los campos obligatorios.',
            'quick_links': 'Enlaces Rápidos',
            'footer_desc': 'Consultoría estratégica especializada desde 2005',
            'copyright': '2023 VS Consultores Corporativos. Todos los derechos reservados.',
            'service1_title': 'Consultoría Fiscal',
            'service1_desc': 'Asesoramiento fiscal integral para el cumplimiento oportuno de obligaciones.',
            'service1_feature1': 'Planificación fiscal estratégica',
            'service1_feature2': 'Declaraciones mensuales y anuales',
            'service1_feature3': 'Asesoramiento en interpretación de normativa',
            'service1_feature4': 'Defensa fiscal ante autoridades',
            'service2_title': 'Administración de Nóminas',
            'service2_desc': 'Gestión completa de nóminas para su empresa.',
            'service2_feature1': 'Cálculo y proceso de nóminas',
            'service2_feature2': 'Control de asistencias e incidencias',
            'service2_feature3': 'Elaboración de IMSS e INFONAVIT',
            'service2_feature4': 'Reportes fiscales y financieros',
            'service3_title': 'Auditoría Financiera',
            'service3_desc': 'Revisión exhaustiva de los estados financieros de su empresa.',
            'service3_feature1': 'Auditoría de estados financieros',
            'service3_feature2': 'Revisión fiscal complementaria',
            'service3_feature3': 'Evaluación de controles internos',
            'service3_feature4': 'Dictamen fiscal',
            'request_info': 'Solicitar información',
            'language': 'Idioma'
        },
        'en': {
            'home': 'Home',
            'services': 'Services',
            'about': 'About Us',
            'blog': 'Blog',
            'contact': 'Contact',
            'hero_title': 'Strategic solutions for your business',
            'hero_subtitle': 'Over 15 years of experience in business consulting',
            'contact_us': 'Contact Us',
            'our_services': 'Our Services',
            'services_subtitle': 'Comprehensive solutions for your company',
            'more_info': 'More info',
            'all_services': 'View all services',
            'about_title': 'About Us',
            'about_text1': 'VS Consultores Corporativos is a company specialized in strategic consulting with over 15 years of experience helping businesses achieve their goals.',
            'about_text2': 'Our team of highly qualified professionals offers customized solutions for each client, adapting to their specific needs and business environment.',
            'more_about': 'More about us',
            'our_team': 'Our Team',
            'ceo_title': 'Founder and CEO',
            'ceo_desc': 'With over 20 years of experience in tax and strategic consulting.',
            'view_profile': 'View profile',
            'our_history': 'Our History',
            'history_text1': 'VS Consultores Corporativos was founded in 2005 by Valeria Valdés Sánchez with the vision of providing high-quality tax and business advisory services to companies in the region.',
            'history_text2': 'From our beginnings in Orizaba, Veracruz, we have grown to become a benchmark in strategic consulting, expanding our services and our team to meet our clients\' needs.',
            'history_text3': 'Today we are a team of professionals committed to excellence and customer satisfaction.',
            'our_values': 'Our Values',
            'value1_title': 'Commitment',
            'value1_desc': 'To our clients and their business success.',
            'value2_title': 'Integrity',
            'value2_desc': 'We always act with ethics and transparency.',
            'value3_title': 'Innovation',
            'value3_desc': 'We seek creative and effective solutions.',
            'value4_title': 'Teamwork',
            'value4_desc': 'We collaborate to achieve common goals.',
            'blog_title': 'Blog',
            'blog_subtitle': 'Tax updates and advice for your business',
            'post1_title': 'Tax Reforms 2023: What your business needs to know',
            'post1_excerpt': 'The main changes to tax legislation affecting businesses this year and how to prepare for compliance.',
            'post2_title': 'Tax benefits for SMEs you can take advantage of',
            'post2_excerpt': 'Discover the tax incentives available for small and medium-sized businesses and how to apply them correctly.',
            'post3_title': 'How digital transformation can optimize your tax processes',
            'post3_excerpt': 'Tools and strategies to digitize your company\'s tax management and save time and resources.',
            'published_by': 'Published by',
            'category_tax': 'Tax',
            'category_tech': 'Technology',
            'read_more': 'Read more',
            'may': 'MAY',
            'apr': 'APR',
            'mar': 'MAR',
            'contact_title': 'Contact',
            'contact_subtitle': 'We are at your disposal for any inquiry',
            'contact_info': 'Contact Information',
            'office_hours': 'Monday to Friday: 9:00 - 18:00',
            'contact_form': 'Contact Form',
            'full_name': 'Full name',
            'email': 'Email',
            'phone': 'Phone',
            'service_interest': 'Service of interest',
            'select_service': 'Select a service',
            'tax_consulting': 'Tax Consulting',
            'payroll_management': 'Payroll Management',
            'financial_audit': 'Financial Audit',
            'other_services': 'Other consulting services',
            'message': 'Message',
            'send_message': 'Send message',
            'form_success': 'Thank you for your message. We will contact you soon.',
            'form_error': 'Please fill in all required fields.',
            'quick_links': 'Quick Links',
            'footer_desc': 'Specialized strategic consulting since 2005',
            'copyright': '2023 VS Consultores Corporativos. All rights reserved.',
            'service1_title': 'Tax Consulting',
            'service1_desc': 'Comprehensive tax advisory for timely compliance with obligations.',
            'service1_feature1': 'Strategic tax planning',
            'service1_feature2': 'Monthly and annual declarations',
            'service1_feature3': 'Regulatory interpretation advice',
            'service1_feature4': 'Tax defense before authorities',
            'service2_title': 'Payroll Management',
            'service2_desc': 'Complete payroll management for your company.',
            'service2_feature1': 'Payroll calculation and processing',
            'service2_feature2': 'Attendance and incident control',
            'service2_feature3': 'IMSS and INFONAVIT preparation',
            'service2_feature4': 'Tax and financial reports',
            'service3_title': 'Financial Audit',
            'service3_desc': 'Thorough review of your company\'s financial statements.',
            'service3_feature1': 'Financial statement audit',
            'service3_feature2': 'Complementary tax review',
            'service3_feature3': 'Internal controls evaluation',
            'service3_feature4': 'Tax opinion',
            'request_info': 'Request information',
            'language': 'Language'
        }
    };

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Actualitzar data de copyright
    const copyrightElements = document.querySelectorAll('[data-translate="copyright"]');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace('2023', currentYear);
    });
}

function updateLanguageSelector(lang) {
    document.querySelectorAll('.current-language').forEach(el => {
        el.textContent = lang.toUpperCase();
    });
    
    document.querySelectorAll('.footer-language .language-btn span').forEach(el => {
        el.textContent = lang.toUpperCase();
    });
}

function updateLinksWithLanguage() {
    const currentLang = localStorage.getItem('preferredLanguage') || 'ca';
    
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.hostname === window.location.hostname && !link.hash) {
            const url = new URL(link.href);
            if (!url.searchParams.has('lang')) {
                url.searchParams.set('lang', currentLang);
                link.href = url.toString();
            }
        }
    });
}