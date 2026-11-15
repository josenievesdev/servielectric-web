# Marcas: pendientes antes de publicar la franja

No hay confirmaciones actuales ni archivos de logo aprobados en el proyecto. Los rótulos neutros visibles en desarrollo sirven para revisar el componente; no representan inventario ni relaciones comerciales.

| Nombre de referencia | Confirmación actual del negocio | Archivo que falta |
| --- | --- | --- |
| 3M | Por consultar: las referencias de fachada no confirman disponibilidad ni distribución autorizada. | SVG o PNG transparente aprobado. Nombre de ruta propuesto: `/images/marcas/3m.svg`. |
| Philips | Por consultar: mismas condiciones. | SVG o PNG transparente aprobado. Ruta propuesta: `/images/marcas/philips.svg`. |
| Sylvania | Por consultar: mismas condiciones. | SVG o PNG transparente aprobado. Ruta propuesta: `/images/marcas/sylvania.svg`. |

Estas rutas son propuestas de organización: los archivos no existen todavía. Consultar además si la empresa quiere incluir otras marcas vigentes o excluir alguna de las referencias.

## Datos para cada marca confirmada

Completar `src/data/marcas.ts`, en `marcasConfirmadas`:

- `nombre`: nombre aprobado.
- `logo`: ruta del archivo entregado/aprobado.
- `ancho` y `alto`: dimensiones originales, para conservar proporciones.
- `anchoOptico`: ancho visual en píxeles, ajustable sin estirar el logo.
- `confirmacion`: fecha y fuente de confirmación actual del negocio.

La franja no usa expresiones como «distribuidor autorizado». La disponibilidad confirmada no implica esa condición.

Cuando haya marcas confirmadas con logos, el componente las muestra también en la compilación estática. Si la lista sigue vacía, producción excluye la franja completa. El modo desarrollo mantiene la demostración explícita con rótulos de muestra.
