# Croquis de accidente

**React + Vite** con **react-konva** 

## Instrucciones de ejecución.

Requisitos: **Node.js 18+** y npm.

```bash
npm install
npm run dev
```

(por defecto en `http://localhost:5173/`).

## Breve explicación del modelo de datos utilizado para representar la escena.

La escena se representa como un **array** de objetos en `useState`. El
JSON exportado es directamente ese array

```json
{
  "id": "c8f3a8e2-5e1e-4f8a-9f3a-9c0b5d2f4a8e",
  "type": "coche",
  "x": 400,
  "y": 300,
  "rotation": 0,
  "color": "#2563eb",
  "label": "Coche"
}
```

Por ejemplo en un campo type de tipo string, controla el tipo de elemento de choche, árbol, señal...
Cada type se pinta con unos colores y una forma que he detrminado (Tipo coche, Rect de X dimensiones y colores como Azul)

Todo esto está en en `src/elementTypes.js`, de manera queañadir un nuevo tipo solo requiere ampliar ese objeto.

## Futuras mejoras

-Añadir rotación a los elementos para angular mejor la dirección de los accidentes
-Elimiar elementos cuando se salgan del "canvas"