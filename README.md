# Petsitters


Bienvenido al proyecto de PetSitters. En este proyecto, hemos creado una plataforma para conectar cuidadores de mascotas con los dueños de mascotas que necesitan servicios de cuidado. Sigue las instrucciones a continuación para configurar y correr el proyecto en tu máquina local.

## Instrucciones de Instalación

**Clonar el repositorio:**

```
git clone https://github.com/danipreciado/Petsitters
```

**Instalar las dependencias tanto para el backend como para el frontend:**

```
cd client 
npm install
```

```
cd server
npm install
```
## Configuración de la Base de Datos
1. **MongoDB:**
Asegurarse de tener una base de datos MongoDB configurada y en ejecución. Puedes configurar la conexión en el archivo `config.js` o mediante variables de entorno.

2. **Agregando Datos Iniciales:**
Para poblar la base de datos con datos iniciales de ejemplo, ejecuta el siguiente comando:

```
npm run seed
```
## Instrucciones para Correr el Proyecto

1. **Iniciar el Servidor:**

```
cd server
npm run dev
```
1. **Iniciar el cliente:**

```
cd client
npm run dev
```
