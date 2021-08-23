Ahorradas TP N° 4 - ADA Curso Desarrolladora FrontEnd
Este repositorio fue creado como consigna del trabajo práctico número 4 del curso de Desarrollo Frontend de ADA
AhorrADAs es una página de control de gastos que almacena la información del usuario en la memoria del navegador o local Storage
Puede editarse o eliminarse cualquier dato a través de la aplicación. 

Desarrolladoras: 
- Yanina Bucca: [portafólio] (https://ybucca.github.io/PortafolioYB/)
- Belen Cludius: [portafólio] (https://belencludius.github.io/portafolio-ada/)
- Mariana Deleau: [portafólio] (https://marianadeleau.github.io/ada-8va-portafolio/)

Requisitos
Terminal
Para poder ejecutar el código vamos a usar la terminal, se puede abrir la Terminal directamente, o ejecutarla desde el VSCode. 

Node
Es necesario tener instalado Node y Typescript para poder compilar el código Typescript en la terminal. 

Estructura
Dentro del repositorio tenemos 5 carpetas y 6 archivos HTML. 
Contenidos de las carpetas:
./assets contiene los gráficos
./css los styles del framework Bootstrap
./js los scripts para ejecutar las funciones del framework
./scripts contiene todos nuestros archivos JS y los Typescript
./styles contiene el archivo override para pisar algunos estilos de Bootstrap


El proyecto se desarrolló en diferentes HTML en lugar de utilizar diferentes secciones que se desplegaban o no según su utilidad. 

./index.html contiene la home con las principales funciones del proyecto: Agregar las operaciones de control de gastos, editar las operaciones, filtros de búsqueda y orden, y vista general de balance de dichas operaciones. 
./nuevasOperacion.html contiene el formulario para agregar las operaciones al local Storage
./editarOperacion.html contiene el formaulario que permite editar cualquier dato de las operaciones
./categorias.html contiene el input para crear y cargar las categorías al Local Storage
./editarCategorias.html contiene el input para editar el nombre de las categorias
./reportes.html agrupa los datos en diferentes vistas resumen, acediendo a la información del local Storage en general. 


### Observaciones del trabajo:
- Se tiparon los principales datos a utilizar, LocalStorage, Operaciones y Categorías. 
- Se realizó una branch por cada función, inclusive para cambiar las mismas 
- Se utilizó el framework Bootstrap
- Diseño web responsive para mobile 


## Deploy en https://marianadeleau.github.io/ahorrADAs/
