export const ELEMENT_TYPES = {
  coche: {
    label: 'Coche',
    color: '#2563eb',
    shape: 'rect',
    width: 80,
    height: 40,
  },
  arbol: {
    label: 'Árbol',
    color: '#16a34a',
    shape: 'circle',
    radius: 28,
  },
  senal: {
    label: 'Señal',
    color: '#dc2626',
    shape: 'triangle',
    radius: 30,
  },
  peaton: {
    label: 'Peatón',
    color: '#b3b77a',
    shape: 'circle',
    radius: 14,
  },
  impacto: {
    label: 'Impacto',
    color: '#ffa200',
    shape: 'impact',
    radius: 36,
    points: [
      0, -36,
      5, -11,
      26, -18,
      14, -1,
      33, 19,
      6, 9,
      3, 30,
      -5, 12,
      -29, 20,
      -12, 0,
      -27, -19,
      -9, -11,
    ],
  },
}

export const ELEMENT_TYPE_LIST = Object.keys(ELEMENT_TYPES)
