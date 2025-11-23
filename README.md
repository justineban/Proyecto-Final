# Análisis de Signos Vitales en UCI

## 🌐 Página Web en Vivo

**URL**: [https://analisis-de-resultados.netlify.app/](https://analisis-de-resultados.netlify.app/)

## Descripción del Proyecto

Este proyecto desarrolla un análisis integral de signos vitales en pacientes de Unidad de Cuidados Intensivos (UCI) con el objetivo de identificar patrones fisiológicos asociados al riesgo clínico mediante técnicas de clustering no supervisado y modelos predictivos supervisados. El dashboard web presenta de forma profesional y académica los resultados del análisis exploratorio de datos (EDA), clustering y modelado predictivo realizado sobre un dataset de 1500 pacientes.

## Objetivo

Aplicar métodos de Machine Learning en el contexto de cuidados intensivos para mejorar la estratificación de riesgo y el apoyo a la toma de decisiones médicas, demostrando que los signos vitales contienen información estructurada suficiente para discriminar entre estados clínicos y predecir niveles de riesgo con alta precisión.

## Contenido del Dashboard

### 1. Introducción
- Presentación del proyecto y contexto clínico
- Descripción del dataset (1500 pacientes con 10 variables)
- Tabla detallada de variables:
  - Patient_ID
  - Respiratory_Rate (Frecuencia Respiratoria)
  - Oxygen_Saturation (Saturación de Oxígeno)
  - O2_Scale (Escala de Oxígeno)
  - Systolic_BP (Presión Arterial Sistólica)
  - Heart_Rate (Frecuencia Cardíaca)
  - Temperature (Temperatura Corporal)
  - Consciousness (Nivel de Conciencia - Escala AVPU)
  - On_Oxygen (Recibiendo Oxígeno Suplementario)
  - Risk_Level (Nivel de Riesgo: Normal, Low, Medium, High)

### 2. Análisis Exploratorio de Datos (EDA)

**Matriz de Correlación**
- Análisis de 6 variables fisiológicas clave con interpretación clínica
- Correlaciones entre frecuencia respiratoria, saturación de oxígeno, presión arterial sistólica, frecuencia cardiaca y temperatura

**Análisis de Boxplots por Nivel de Riesgo**
- Distribución de signos vitales según categorías de riesgo
- Identificación de patrones de deterioro fisiológico

**Distribución de Variables Categóricas**
- Balance entre niveles de riesgo
- Análisis de desbalance en nivel de conciencia
- Distribución de pacientes con oxígeno suplementario (27%)

**Outliers Fisiológicos**
- Identificación de valores atípicos clínicamente plausibles
- Validación de la calidad y consistencia del dataset

**Relación entre Variables**
- Stripplots mostrando relaciones entre oxígeno suplementario y saturación
- Análisis de nivel de conciencia vs frecuencia cardiaca

### 3. Métodos Utilizados

**Estandarización de Variables (StandardScaler)**
- Normalización de signos vitales para evitar dominancia de escalas mayores

**Reducción de Dimensionalidad (PCA)**
- Proyección en 2 dimensiones para visualización
- Conservación de variabilidad máxima

**K-Means Clustering**
- Algoritmo de partición basado en distancia euclidiana
- Identificación de fenotipos fisiológicos

**Visualización de Clusters en PCA**
- Comparación de clusters con niveles de riesgo reales

### 4. Clustering Fisiológico (K-Means)

Análisis con 5 signos vitales identificando 4 clusters:

**Cluster 0: Pacientes Estables**
- Signos vitales dentro de rangos normales
- Predominio de riesgo Normal y Low

**Cluster 1: Estrés Respiratorio Moderado**
- Frecuencia respiratoria elevada, saturación ligeramente reducida
- Predominio de riesgo Medium

**Cluster 2: Pacientes Críticos**
- Hipoxemia severa, taquicardia, hipotensión, fiebre
- Alta concentración de riesgo High

**Cluster 3: Pacientes Febriles con Taquicardia**
- Infección sin compromiso respiratorio extremo
- Mezcla de Medium y High

### 5. Clustering Hemodinámico

Análisis basado en variables hemodinámicas y metabólicas (presión arterial, frecuencia cardiaca, temperatura):

**Cluster 0**: Taquicardia + presión baja (choque temprano)
**Cluster 1**: Pacientes más estables (hemodinámicamente saludables)
**Cluster 2**: Fiebre + taquicardia intensa + presión baja (choque séptico)
**Cluster 3**: Estado intermedio (infecciones tempranas)

### 6. Signos Vitales Generales (Visualización PCA)

- Comparación de clusters K-Means vs nivel de riesgo real
- Validación de la separación de fenotipos fisiológicos
- Confirmación de alineación entre clusters y niveles de riesgo clínico

### 7. Modelo Predictivo (Random Forest)

**Desempeño del Modelo**
- Precisión general: 96%
- Métricas sobresalientes en todas las clases (Normal, Low, Medium, High)

**Variables Más Influyentes**
1. Oxygen_Saturation (0.2257)
2. Heart_Rate (0.2169)
3. Respiratory_Rate (0.1962)
4. Systolic_BP (0.1720)
5. Temperature (0.1493)

**Matriz de Confusión**
- 46/48 Normal correctos (95.8%)
- 73/76 Low correctos (96.1%)
- 88/92 Medium correctos (95.7%)
- 81/84 High correctos (96.4%)
- Errores principalmente entre clases adyacentes (comportamiento clínicamente razonable)

### 8. Conclusiones

**Hallazgos Principales**
- Dataset consistente y clínicamente coherente
- Clustering identifica exitosamente fenotipos fisiológicos diferenciados
- Modelo predictivo alcanza 96% de precisión
- Variables respiratorias y hemodinámicas son los indicadores críticos más importantes

**Implicaciones Clínicas**
- Herramienta complementaria para monitorización continua
- Detección temprana de deterioro clínico
- Personalización de intervenciones según perfil fisiológico
- Apoyo a la decisión, no reemplazo del juicio clínico

**Líneas Futuras**
- Validación externa en otras instituciones
- Incorporación de series temporales
- Integración de variables adicionales (laboratorio, antecedentes)
- Desarrollo de sistemas en tiempo real con alertas automáticas
- Interpretabilidad avanzada (SHAP, LIME)

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Estilos**: CSS puro con Google Fonts (Merriweather + Open Sans)
- **Fuente de Datos**: Dataset estático de Kaggle (1500 pacientes UCI)
- **Visualizaciones**: Imágenes exportadas desde Google Colab (Matplotlib/Seaborn)

## Estructura del Proyecto

```
web-dashboard/
├── public/
│   └── images/          # Visualizaciones exportadas desde Colab
├── src/
│   ├── App.tsx         # Componente principal con todas las secciones
│   ├── global.css      # Estilos globales
│   └── main.tsx        # Punto de entrada
├── index.html          # HTML base
├── package.json        # Dependencias
└── vite.config.ts      # Configuración de Vite
```

## Instalación y Ejecución

### Requisitos Previos
- Node.js 18 o superior
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
El dashboard estará disponible en `http://localhost:5173`

### Build para Producción
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `dist/`

### Preview de Producción
```bash
npm run preview
```

## Navegación del Dashboard

El dashboard incluye un navbar superior con navegación a las siguientes secciones:

- **Introducción**: Contexto y descripción del dataset
- **Dataset**: Tabla detallada de variables
- **Análisis de gráficas**: Todas las visualizaciones del EDA
- **Métodos**: Descripción de técnicas utilizadas
- **Conclusiones**: Hallazgos, implicaciones y líneas futuras

## Características del Diseño

- **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla
- **Navegación Suave**: Scroll automático con compensación de altura del navbar
- **Tipografía Profesional**: Fuentes serif (Merriweather) para títulos y sans-serif (Open Sans) para cuerpo
- **Layout Académico**: Inspirado en artículos de investigación y reportes profesionales
- **Colores Institucionales**: Paleta basada en Universidad del Norte (rojo #c41e3a)
- **Texto Justificado**: Para mejor legibilidad en secciones narrativas
- **Imágenes con Text Wrapping**: Layout profesional con texto fluyendo alrededor de visualizaciones

## Autores

- Justine Barreto
- Andrés Evertsz

## Institución

Universidad del Norte - 2025

## Licencia

Este proyecto es proyecto final para la Universidad del Norte.

