# Proyecto Sitio Web - VSCC (Valdés Sánchez Consultores Corporativos)

Este repositorio contiene el código fuente del sitio web estático para **VSCC (Valdés Sánchez Consultores Corporativos)**, una firma de consultoría y auditoría con sede en Orizaba, Veracruz.

El sitio web sirve como presencia digital de la compañía, detallando su historia, servicios, valores y proporcionando métodos de contacto.

## Características Principales

El sitio está construido con HTML, CSS y JavaScript puros, e incluye las siguientes características:

* **Diseño Responsivo:** Adaptable a dispositivos móviles, tabletas y computadoras de escritorio.
* **Navegación Intuitiva:** Incluye un menú de navegación principal y un menú "hamburguesa" para móviles.
* **Secciones Clave:**
    * **Inicio:** Página principal con una introducción a la firma y sus servicios.
    * **Acerca de:** Detalla la historia de la firma (fundada en 2005), su misión, visión, valores y el perfil del equipo.
    * **Servicios:** Describe en detalle las ofertas de la consultora, como Auditoría, Contabilidad, Administración de Nómina y Consultoría Empresarial.
    * **Boletín (Blog):** Página que redirige al boletín externo de la firma en Substack.
    * **Contacto:** Incluye un formulario de contacto, información de ubicación (Ote. 6 1320-6, Centro, 94300 Orizaba, Ver.), teléfonos y un mapa.
* **Interactividad con JavaScript:**
    * Animaciones al hacer scroll que se activan mediante `IntersectionObserver`.
    * Una ventana modal para mostrar el perfil detallado de la fundadora.
    * Un botón y formulario de contacto flotante para acceso rápido.
    * Resaltado activo del enlace de la página actual en el menú de navegación.

## Tecnologías Utilizadas

* **HTML5**
* **CSS3:** Se utiliza CSS moderno, incluyendo variables (`:root`) para la paleta de colores.
* **JavaScript (ES6+):** Para toda la interactividad del sitio.
* **Font Awesome:** Para la iconografía en todo el sitio.
* **Animate.css:** Para las animaciones de entrada.

## Estructura del Proyecto

```
/
├── .vscode/
│   └── launch.json
├── css/
│   └── styles.css
├── images/
│   ├── IMG_7683.jpg
│   ├── IMG_7690.jpg
│   ├── IMG_7707.jpg
│   ├── IMG_7718.jpg
│   ├── VSCC-globo-Transparente.png
│   ├── VSCC-globo-blanco-transparent.png
│   ├── Valeria.jpeg
│   ├── _S5A4372.jpg
│   ├── _S5A4388.jpg
│   ├── oficinasvscc.jpg
│   └── salajuntas.jpeg
├── js/
│   └── main.js
├── blog.html
├── contacte.html
├── index.html
├── serveis.html
└── sobre-nosaltres.html
```

## Instalación y Uso

Este es un proyecto web estático. No requiere un *backend* para funcionar.

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL-DEL-REPOSITORIO]
    ```
2.  **Abrir el proyecto:**
    Navega a la carpeta del proyecto y abre el archivo `index.html` directamente en tu navegador web.

3.  **Desarrollo (Recomendado):**
    Para una mejor experiencia de desarrollo y para evitar problemas con las peticiones de archivos (aunque este proyecto no las tiene), se recomienda servir los archivos a través de un servidor web local.
    * Si usas **Visual Studio Code**, puedes usar la extensión "Live Server".
    * El proyecto incluye una configuración de lanzamiento (`.vscode/launch.json`) que facilita la depuración en Chrome si se sirve desde un `localhost`.
