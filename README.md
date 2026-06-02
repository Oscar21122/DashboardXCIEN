# Dashboard de Capacidad — Red XCIEN Saltillo 

Tablero administrativo que visualiza el **uso y la saturación** de la red por
niveles, alimentado por el Excel operativo (fuente única de verdad).

## Archivos
- `Inventario_red_xcien_CWDM.xlsx` — base de datos operativa (CWDM + OADMs).
- `dashboard_xcien.py` — dashboard en Streamlit.
- `requirements.txt` — dependencias.

## Cómo ejecutarlo
1. Instala Python 3.9+ y las dependencias:
   ```
   pip install -r requirements.txt
   ```
2. Coloca el Excel y el script en la misma carpeta y ejecuta:
   ```
   streamlit run dashboard_xcien.py
   ```
3. Se abre en el navegador (http://localhost:8501). También puedes subir
   el Excel desde la barra lateral.

## Lógica
- Filtros: **Región**, **Nodo**, **Nivel de saturación**.
- Umbrales (coinciden con la hoja `Parametros`): Verde <60 %, Amarillo 60–80 %,
  Rojo >80 %; la línea punteada marca el **70 %** (disparo de crecimiento).
- Para actualizar: edita el Excel (clientes, tráfico, capacidades) y recarga.

> Es un tablero **administrativo de capacidad**, no de monitoreo de
> infraestructura. La evolución futura sería poblar el Excel vía SNMP.
