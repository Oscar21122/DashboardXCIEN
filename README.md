# Dashboard de Capacidad — Red XCIEN Saltillo 

Tablero **administrativo** que visualiza el uso y la saturación de la red por
niveles, alimentado por el Excel operativo (fuente única de verdad). No es un
monitoreo de infraestructura en tiempo real: está enfocado a **capacidad** para
la toma de decisiones (cuándo ampliar nodos, OADMs y salidas a Internet).

## Tecnología
Un solo archivo HTML con **JavaScript puro + SheetJS** (lee el `.xlsx` en el
navegador). Sin frameworks, sin `pip`, sin compilación. Las gráficas (barras y
dona) son CSS/SVG. SheetJS se incluye localmente, así que **funciona sin
internet**.

## Archivos
- `index.html` — el dashboard.
- `xlsx.full.min.js` — librería SheetJS (lee el Excel). Debe estar junto al HTML.
- `BD_Capacidad_XCIEN.xlsx` — base de datos operativa (CWDM + OADMs).

## Cómo ejecutarlo

**Opción A — abrir directo (más simple):**
Haz doble clic en `index.html`. Aparece una pantalla para **arrastrar o
seleccionar** `BD_Capacidad_XCIEN.xlsx`. Listo.

**Opción B — servidor local (carga automática):**
En la carpeta con los tres archivos:
```
python -m http.server 8000
```
Abre `http://localhost:8000/index.html`. El Excel se carga solo.

> Nota: la carga automática solo funciona con servidor local (opción B). Con
> doble clic (opción A) hay que arrastrar el archivo una vez — es por seguridad
> del navegador, no un error.

## Lógica del tablero
- **Filtros** (barra lateral): Región, Nodo y Nivel de saturación.
- **Umbrales** (coinciden con la hoja `Parametros` del Excel): Verde < 60 %,
  Ámbar 60–80 %, Rojo > 80 %. La línea punteada marca el **70 %** = disparo de
  crecimiento bajo demanda.
- **Paneles**: KPIs generales · saturación de acceso por nodo (barras + tabla) ·
  saturación de transporte (por nodo y por enlace del anillo) · ocupación CWDM
  por región · OADMs en rojo/ámbar (prioridad de crecimiento) · salidas a
  Internet (DRP) · clientes por segmento.

## Actualizar datos
Edita `BD_Capacidad_XCIEN.xlsx` (clientes, tráfico, capacidades, OADMs) y vuelve
a cargarlo / recarga la página. Todos los porcentajes y niveles se recalculan.

## Evolución futura
Hoy el Excel se actualiza de forma manual. El siguiente paso sería poblarlo
automáticamente vía **SNMP** desde los equipos para acercarse a tiempo real,
manteniendo el mismo tablero.

---
