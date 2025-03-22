
## Guardar cambios de la rama local y subirlo a la rama remota

Antes de realizar ningún cambio, primero comprobamos en que rama nos encontramos. Es indispensable estar en nuestra rama local y en esta misma realizar todas las modificaciones para no tener que causar ningún que otro error.
Para comprobar en que rama estamos:

```cmd
git branch
```

Este comando nos indicará en color verde en que rama local nos encontramos. Pero también tenemos que comprobar si esta rama se encuentra vinculada con la rama remota, para eso nos dirigimos a otra rama local con:

```cmd
git checkout ramaLocal
```

y después volvemos a dirigirnos a la rama local en la que estábamos antes con el mismo comando `git checkout ramaLocal`.
Una vez hemos cambiado, nos tiene que salir que la rama se encuentra vinculada a una rama `origin/`.
Si no encontramos esta respuesta entonces tendremos que vincularla y para ello simplemente tendremos que poner el siguiente comando:

```cmd
git branch --set-upstream-to=origin/feature/ramaRemota
```

Si no existe hacemos los siguiente:

```cmd
git push -u origin feature/login
```

- **Sube la rama `feature/login` al repositorio remoto (`origin`).**
    
    - Si `feature/login` no existía en el remoto, la crea.
        
    - Si ya existía, simplemente actualiza los cambios.
        
- **Vincula tu rama local `feature/login` con la remota `origin/feature/login`.**
    
    - Esto significa que, a partir de ahora, cuando hagas `git pull` o `git push`, Git ya sabe a qué rama debe enviar o recibir cambios sin necesidad de especificarlo.

Después la sincronizamos para que nos traiga los últimos cambios de la rama remota a nuestra rama local

```cmd
git pull origin 
```

Una vez que hayamos realizado los cambios en nuestra rama local, seguiremos los siguientes comandos:

```cmd
git status // comprobamos que reconoce todas las modificaciones (rojo)
git add . // añadimos todos los cambios
git status // comprobamos si se han guardado todos los cambios (verde)
		   // si sigue saliendo en rojo, deberemos añadirlas individualmente
		   // *solo las rojas -> git add ../cambio
git commit -m "Nueva modificación fecha-ramaDelModificador" // realizamos el commit
git status // comprobamos que todo esta correctamente guardado
git push origin ramaRemota // Finalmente subimos los cambios de nuestra rama local
			               // a nuestra rama remota a la que estamos conectados
```



