 Tipografías
  - Poppins
  - Montserrat
  - Roboto 
  - Open Sans
  - Lato
  - Raleway
  - Lora

  - Poppins + Montserrat
  - Raleway + Montserrat (Viceversa)
  - Open Sans + Poppins
  - Raleway + Lora
  - Open Sans + Roboto (Viceversa)
  - Roboto + Montserrat
  - Montserrat
  - Poppins


https://hencework.com/theme/hound/rtl-light/


Páginas de BackOffice: 
  - Inicio
  - Perfil
  - Cambiar contraseña
  - Productos
  - Cerrar sesión
  - -------------
  - Redes sociales




App settings:
   - Segundo botón:
     - color verde si la pantalla tiene menos de 992px
     - letra tenga un tamaño de 10px, color blanco 
     el texto y color del botón negro si la 
     pantalla es menor a 576px

  
  - Tercer botón:
    - el span no debe de aparecer si el dispositivo tiene una pantalla inferior a 576px y el icono tendrá un
    tamaño de "larger" -> max-width
    - si la pantalla es superior a 1200px el botón no debe de aparecer -> min-width

  - Cuarto botón
    - Tamaño de width general 200px
    - pero cuando la pantalla sea inferior a 992px el width será de 80%

  - Quinto botón
    - El botón desaparecerá en los dispositivos que tengan un mínimo de 
    769px y 992px y el color de fondo será naranja

  - Sexto botón
    - El botón por defecto va a tener una altura de 300px
    - Cuando la pantalla tenga una altura inferior a 700px el botón tendrá una altura de 100px
    - Si la pantalla tiene ua altura superior a 800px, el botón no debe de aparecer



  

Puntos de ruptura:
  -> Móviles muy pequeños se encuentran entre los 350px-375px de ancho -> Nosotros lo haríamos de forma manual en el css
  -> tamaño medio de móviles -> 576px -> sm
  -> Móviles más grandes y tablets pequeñas -> 769px -> md
  -> Móviles (la mayoría) en landscape y tablets grandes -> 992px -> lg
  -> Otras tablets (iPads, entre otros) y portátiles con pantallas pequeñas (13', 14') -> 1200px -> xl
  -> Ordenadores con pantallas grandes -> 1400px -> xxl
  -> A partir de 1400px cualquier tipo de pantalla grande



Dependencias usadas para gráficos:
   - npm install chart.js ng2-charts

Dependencia para los tokens en cookies:
  - npm i ngx-cookie-service
