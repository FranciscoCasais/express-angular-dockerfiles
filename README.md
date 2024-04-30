# express-angular-dockerfiles

## Integrantes:

- Casais, Francisco
- Panzera, Lucas

## Resumen

Estos son los archivos para crear una aplicación Angular de ABM de canciones conectada a una API en Express.js. La aplicación Angular y la API se ejecutan localmente y por separado en dos contenedores Docker que se comunican entre sí a través en una red (es necesario tener Docker instalado).

- ```back-end```: Archivos de la API
- ```front-end```: Archivos de la aplicación Angular
- ```dockerfile-backend```: El archivo que crea la imagen Docker donde se ejecutará la API
- ```dockerfile-frontend```: El archivo que crea la imagen Docker donde se ejecutará la aplicación Angular
- ```docker-compose.yaml```: El archivo que crea ambos contenedores para cada sección del proyecto y los coloca dentro una red Docker local.

## Construcción y ejecución del proyecto

1. Clonar el repositorio en tu terminal con:

    ```
   git clone https://github.com/FranciscoCasais/express-angular-dockerfiles.git
    ```

3. Ingresar al directorio donde se clonó y ejecutar el archivo ```docker-compose.yaml``` en tu terminal con el comando:

    ```
   docker-compose -f ./docker-compose.yaml up -d
    ```

5. La API se ejecuta por defecto en ```localhost:3000``` y la aplicación Angular en ```localhost:4200```. Podés ir tu navegador e ingresar estas direcciones para acceder a ellas.
6. Para finalizar la ejecución y eliminar contenedores e imágenes:

    ```
    // Detener el front y back-end
    docker stop express-angular-dockerfiles-front-end
    docker stop express-angular-dockerfiles-back-end

    // En caso de querer volver a ejecutar un contenedor
    docker start express-angular-dockerfiles-front-end
    docker start express-angular-dockerfiles-back-end

    // Eliminar contenedores e imágenes
    docker rm express-angular-dockerfiles-front-end
    docker rm express-angular-dockerfiles-back-end
    docker image rm express-angular-dockerfiles-front-end
    docker image rm express-angular-dockerfiles-back-end

    // Verificar contenedores e imágenes descargadas
    docker ps -a
    docker images
    ```
