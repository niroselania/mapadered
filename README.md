# RedMapa

Aplicación visual y sencilla para documentar las redes de Casa y Depósito.

## Despliegue en Portainer

1. En **Stacks**, elegí **Add stack**.
2. Pegá el contenido de `docker-compose.yml` o subí esta carpeta a tu servidor y elegí el archivo.
3. Desplegá el stack y abrí `http://IP-DE-TU-SERVIDOR:8088`.

Los cambios se guardan automáticamente dentro del volumen Docker `red-mapa-datos`, por lo que todos los equipos que abran la misma dirección ven el mismo mapa. El mapa se conserva aunque reinicies o actualices el contenedor. Usá **Exportar** como copia adicional e **Importar** para restaurar un respaldo.
