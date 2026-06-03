# XCIEN · Dashboard de Capacidad

Tablero **administrativo** de capacidad para la red metropolitana de fibra de
XCIEN (Saltillo): acceso **CWDM/OADM**, transporte en anillo **G.8032 / MPLS-IP**.
Visualiza el uso y los niveles de saturación para decidir cuándo ampliar nodos,
OADMs y salidas a Internet. No es monitoreo de infraestructura: es administrativo,
enfocado a capacidad.

## Stack
- **Vite + React + TypeScript**
- **Tailwind CSS + shadcn/ui** (componentes)
- **SheetJS (xlsx)** — lee la base de datos Excel en el navegador

La fuente de datos es `src/data/BD_Capacidad_XCIEN.xlsx`, importada en el código y
empaquetada en el build. Para actualizar los datos, reemplaza ese archivo.

## Requisitos
- Node.js 18+ y npm

## Cómo correrlo
```bash
npm install      # instala dependencias
npm run dev      # entorno de desarrollo (http://localhost:5173)
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción
```

## Estructura
```
src/
  components/
    ui/            # componentes shadcn (card, button, badge, table, checkbox)
    panels/        # paneles del dashboard
    Sidebar.tsx    # filtros: Región · Nodo · Nivel de saturación
    BarList.tsx    # barras horizontales con umbral 70%
    Donut.tsx KpiRow.tsx LevelPill.tsx PanelHead.tsx
  data/            # BD_Capacidad_XCIEN.xlsx (fuente de verdad)
  hooks/           # useNetworkData
  lib/             # excel.ts (parseo), levels.ts (umbrales), utils.ts
  types.ts         # tipos del modelo
  App.tsx          # orquesta filtros, KPIs y layout
```

## Umbrales de saturación
Verde < 60% · Ámbar 60–80% · Rojo > 80% · línea punteada = **70%** (disparo de
crecimiento bajo demanda). Coinciden con la hoja `Parametros` del Excel.

## Evolución futura
Hoy el Excel se actualiza manualmente. El siguiente paso sería poblarlo vía
**SNMP** desde los equipos, manteniendo el mismo tablero.

---
*XCIEN · Conectividad Inteligente — Tecnológico de Monterrey, Equipo 7.*
