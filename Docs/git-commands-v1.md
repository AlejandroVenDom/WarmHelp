
## 1. Crear rama local y remota en nuestro proyecto git

>Es importante saber que solo los administradores del repositorio deberían crear las ramas remotas, los participantes deberían conectarse a las ramas remotas, no crearlas. (Punto 2)

Para poder trabajar en nuestro dispositivo de manera remota, primero deberemos crear una rama local en nuestro dispositivo. Para ello usaremos los siguientes comandos:

```git
git checkout -b nombreRamaLocal
```

Una vez creada la rama local en en nuestro dispositivo, la subiremos a git para poder crear así una rama remota con el mismo nombre de nuestra rama local y además de poder conectar ambas ramas (local y remota). El comando sería el siguiente:

```git
git push -u origin nombre-de-la-rama
```

Para comprobar que la rama remota se ha subido correctamente, introducimos el siguiente comando:

```git
git branch -r
```

Este comando nos dará todas las ramas remotas disponibles. Sin embargo, si no nos sale ninguna rama parecida a la que hemo subido, lo que haremos será actualizar nuestro git para poder visualizar todas las ramas remotas actualizadas.

```git
git fetch --prune
```

Ahora ya tendremos creada nuestra rama local y remota de nuestro proyecto git.

## 2. Conectar rama local con rama remota

Ya que tenemos creada nuestra rama local en nuestro dispositivo, lo que haremos será conectar nuestra rama local con la remota para poder así subir y traer la información de dicha rama remota.
Es importante estar ubicados en la rama local a la que queramos conectarla con la remota, una vez estemos correctamente ubicados, utilizaremos el siguiente comando:

```git 
git branch --set-upstream-to=origin/nombreRamaRemota

// También se puede hacer de la siguiente manera

git branch -u origin/nombreRamaRemota
```

Finalmente comprobamos que nuestra rama local se ha conectado satisfactoriamente con nuestra rama remota con:

```git
git status
```

El resultado que nos debería salir sería:

>Your branch is up to date with 'origin/nombre-de-la-rama'.

## 3. Guardar cambios de la rama local y subirlo a la rama remota

Antes de realizar ningún cambio, primero comprobamos en que rama nos encontramos. Es indispensable estar en nuestra rama local y en esta misma realizar todas las modificaciones para no tener que causar ningún conflicto al subir nuestros cambios realizados.
Para comprobar en que rama estamos utlizaremos:

```cmd
git branch
```

Este comando nos indicará en color verde en que rama local nos encontramos. Pero también tenemos que comprobar si esta rama se encuentra vinculada con la rama remota, para eso nos dirigimos a otra rama local con:

```cmd
git checkout ramaLocal
```

y después volvemos a dirigirnos a la rama local en la que estábamos antes con el mismo comando `git checkout ramaLocal`.
Una vez hemos cambiado, nos tiene que salir que la rama se encuentra vinculada a una rama `origin/` , con el mensaje *Your branch is up to date with 'origin/nombre-de-la-rama'.* La cual indica que esta rama se encuentra vinculada a una rama remota.

Una vez que hayamos comprobado que nuestra rama local se encuentra conectada y además de haber realizado los cambios en nuestra rama local, seguiremos los siguientes comandos:

```cmd
// comprobamos que reconoce todas las modificaciones (rojo)
git status

// añadimos todos los cambios
git add .

// comprobamos si se han guardado todos los cambios (verde), y sino deberemos guardarlas de uno en uno.
git status

// Escribimos nuestro mensaje de modificación
git commit -m "Nueva modificación fecha-ramaDelModificador"

// Nuevamente comprobamos que todo esta correctamente guardado
git status

// Finalmente subimos los cambios de nuestra rama local a nuestra rama remota a la que estamos conectados
git push origin ramaRemota 
```

Si hemos seguido todos los pasos a la perfección, en el repositorio en el que estemos conectados deberá salirnos los cambios realizados.

Ahora bien, si los demás participantes del proyecto necesitan las modificaciones, deberan utilizar el siguiente comando:

```git
git pull origin nombreRamaRemota
```

>*Esta es una nueva forma de visualizar los cambios* 

```git
git log --oneline --graph --decorate --all
```

>*Para eliminar una rama local haremos lo siguiente*

```git
git branch -d nombre-de-la-rama
```

>*Para eliminar una rama remota haremos lo siguiente*

```git
git push origin --delete nombre-de-la-rama
```
