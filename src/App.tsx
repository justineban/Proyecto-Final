import React, { useState, useEffect } from 'react';
import './global.css';

interface FigureBlock {
  id: string;
  title: string;
  img: string;
  placeholderText: string;
}

const figures: FigureBlock[] = [
  { id:'correlacion', title:'Matriz de Correlación', img:'matrizc.png', placeholderText:'Interpreta las correlaciones más fuertes y su relevancia clínica.' },
  { id:'analisis-ampliado', title:'Análisis Ampliado', img:'anamatriz.png', placeholderText:'Espacio para agregar visualizaciones adicionales o PCA.' },
  { id:'countplots', title:'Distribución de Variables Categóricas', img:'conteovar.png', placeholderText:'Comenta el balance/desbalance de categorías y utilidad analítica.' },
  { id:'outliers', title:'Outliers Fisiológicos', img:'outfis.png', placeholderText:'Describe la presencia y naturaleza de outliers clínicamente plausibles.' },
  { id:'relaciones', title:'Relación entre Variables', img:'relacion.png', placeholderText:'Explica brevemente correlaciones destacadas y su interpretación.' },
  { id:'clustering-fisio', title:'Clustering Fisiológico (K-Means)', img:'clusteringfis.png', placeholderText:'Caracteriza cada cluster y su relación con el riesgo.' },
  { id:'clustering-hemo', title:'Clustering Hemodinámico', img:'hemodinamico.png', placeholderText:'Describe patrones hemodinámicos y gradientes de severidad.' },
  { id:'signos-vitales', title:'Signos Vitales Generales', img:'signosvi.png', placeholderText:'Texto introductorio sobre el dataset y objetivos clínicos.' },
  { id:'modelo-rf', title:'Importancia de Características (Random Forest)', img:'random.png', placeholderText:'Resume el ranking de variables y su interpretación clínica.' },
  { id:'matriz-confusion', title:'Matriz de Confusión', img:'confu.png', placeholderText:'Analiza aciertos y errores entre clases de riesgo.' }
];

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 70; // Altura del navbar fijo
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="layout-simple">
      {/* Navbar superior profesional */}
      <nav className="main-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src="/images/uninorte.png" alt="Universidad del Norte" />
          </div>
          <ul className="navbar-links">
            <li><a href="#introduccion" onClick={(e) => { e.preventDefault(); scrollToSection('introduccion'); }}>Introducción</a></li>
            <li><a href="#dataset" onClick={(e) => { e.preventDefault(); scrollToSection('dataset'); }}>Dataset</a></li>
            <li><a href="#analisis-graficas" onClick={(e) => { e.preventDefault(); scrollToSection('analisis-graficas'); }}>Análisis de gráficas</a></li>
            <li><a href="#metodos" onClick={(e) => { e.preventDefault(); scrollToSection('metodos'); }}>Métodos usados</a></li>
            <li><a href="#conclusiones" onClick={(e) => { e.preventDefault(); scrollToSection('conclusiones'); }}>Conclusiones</a></li>
          </ul>
        </div>
      </nav>

      <section className="intro-section" id="introduccion">
        <div className="intro-container">
          <div className="intro-text">
            <h1>Análisis de Signos Vitales en Unidad de Cuidados Intensivos</h1>
            <p>
              Este proyecto presenta un estudio exhaustivo de signos vitales en pacientes de la Unidad de Cuidados Intensivos (UCI), 
              empleando técnicas avanzadas de análisis de datos, clustering y modelado predictivo. A través de la exploración de variables 
              fisiológicas críticas, se identifican patrones clínicos relevantes que permiten una mejor comprensión del estado de los pacientes 
              y la predicción de niveles de riesgo. Los resultados obtenidos demuestran la aplicabilidad de métodos de machine learning en 
              el contexto médico, proporcionando herramientas valiosas para la toma de decisiones clínicas informadas.
            </p>
            <p className="data-source">
              El conjunto de datos <strong>Health Risk Prediction (Anonymized Real Data)</strong> fue obtenido de Kaggle:{' '}
              <a href="https://www.kaggle.com/datasets/ludocielbeckett/health-risk-prediction-anonymized-real-data/data" target="_blank" rel="noopener noreferrer">
                https://www.kaggle.com/datasets/ludocielbeckett/health-risk-prediction-anonymized-real-data/data
              </a>
            </p>
          </div>
          <div className="intro-image">
            <img src="/images/uci.jpg" alt="Unidad de Cuidados Intensivos" />
          </div>
        </div>
      </section>

      {/* Sección de descripción del dataset */}
      <section className="dataset-section" id="dataset">
        <div className="dataset-container">
          <h2>Descripción del Dataset</h2>
          <p className="dataset-intro">
            El conjunto de datos contiene información anonimizada de pacientes en la Unidad de Cuidados Intensivos. 
            A continuación se describen las variables incluidas en el análisis:
          </p>
          <div className="dataset-table-wrapper">
            <table className="dataset-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Patient_ID</strong></td>
                  <td>Identificador único y anonimizado de cada paciente.</td>
                </tr>
                <tr>
                  <td><strong>Respiratory_Rate</strong></td>
                  <td>Frecuencia respiratoria (respiraciones por minuto).</td>
                </tr>
                <tr>
                  <td><strong>Oxygen_Saturation</strong></td>
                  <td>Nivel de saturación de oxígeno en sangre (%) medido por pulsioximetría.</td>
                </tr>
                <tr>
                  <td><strong>O2_Scale</strong></td>
                  <td>Escala o nivel de soporte de oxígeno administrado.</td>
                </tr>
                <tr>
                  <td><strong>Systolic_BP</strong></td>
                  <td>Presión arterial sistólica (mmHg).</td>
                </tr>
                <tr>
                  <td><strong>Heart_Rate</strong></td>
                  <td>Frecuencia cardíaca (latidos por minuto).</td>
                </tr>
                <tr>
                  <td><strong>Temperature</strong></td>
                  <td>Temperatura corporal (°C).</td>
                </tr>
                <tr>
                  <td><strong>Consciousness</strong></td>
                  <td>Nivel de conciencia del paciente según la escala AVPU:
                    <ul>
                      <li><strong>A</strong> = Alert (Alerta)</li>
                      <li><strong>V</strong> = Verbal response (Responde a voz)</li>
                      <li><strong>P</strong> = Pain response (Responde al dolor)</li>
                      <li><strong>C</strong> = Confusion (Confundido)</li>
                      <li><strong>U</strong> = Unresponsive (No responde)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td><strong>On_Oxygen</strong></td>
                  <td>Indica si el paciente recibe oxígeno suplementario (0 = No, 1 = Sí).</td>
                </tr>
                <tr>
                  <td><strong>Risk_Level</strong></td>
                  <td>Variable objetivo, clasifica el nivel de riesgo clínico: <strong>Normal, Low, Medium, High</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <main className="content-simple" id="analisis-graficas">
        <div className="viz-container">
        {/* Sección especial de Matriz de Correlación con layout de dos columnas */}
        <section id="correlacion" className="viz-section viz-section-special">
          <h2>Análisis de la Matriz de Correlación de los Signos Vitales</h2>
          <div className="correlation-layout">
            <div className="correlation-image">
              <img src="/images/matrizc.png" alt="Matriz de Correlación" loading="lazy" />
            </div>
            <div className="correlation-text">
              <h4>Frecuencia Respiratoria (Respiratory Rate)</h4>
              <p>
                La frecuencia respiratoria muestra relaciones clínicas claras con otras variables fisiológicas. A medida que aumenta, 
                la saturación de oxígeno tiende a disminuir (–0.63), un patrón típico en pacientes con hipoxemia compensada mediante 
                taquipnea. También se observa una ligera asociación positiva con la escala de oxígeno administrado (0.23), lo que indica 
                que quienes respiran más rápido suelen requerir mayores niveles de soporte de O₂. Además, existe una correlación inversa 
                importante con la presión arterial sistólica (–0.62), dado que la hipotensión puede desencadenar taquipnea como respuesta 
                compensatoria. La relación con la frecuencia cardiaca es una de las más fuertes (0.68), reflejando el aumento simultáneo 
                de ambos parámetros durante el estrés fisiológico. Asimismo, la temperatura corporal se relaciona positivamente (0.58), 
                ya que la fiebre incrementa la demanda metabólica. Por último, los pacientes con respiración acelerada presentan mayor 
                probabilidad de estar recibiendo oxígeno suplementario (0.42).
              </p>
              
              <h4>Saturación de Oxígeno (Oxygen Saturation)</h4>
              <p>
                La saturación de oxígeno presenta patrones coherentes en pacientes críticamente enfermos. Valores más bajos suelen 
                acompañarse de mayor necesidad de soporte respiratorio, lo que se refleja en su relación con la escala de oxígeno 
                administrado (–0.24) y con la probabilidad de estar efectivamente bajo oxígeno suplementario (–0.39). También existe 
                una relación positiva con la presión arterial sistólica (0.60), ya que una mejor perfusión favorece saturaciones más 
                altas. En contraste, se correlaciona negativamente con la frecuencia cardiaca (–0.59) y la temperatura (–0.57), 
                evidenciando que la hipoxemia y la fiebre suelen acompañarse de inestabilidad cardiorrespiratoria.
              </p>
              
              <h4>Escala de Oxígeno Administrado (O2 Scale)</h4>
              <p>
                La escala de oxígeno administrado guarda una correlación significativa con indicadores de inestabilidad fisiológica. 
                Presenta relación inversa con la presión arterial sistólica (–0.25), reflejando que la hipotensión a menudo se asocia 
                con mayor requerimiento de soporte ventilatorio. Asimismo, aumenta levemente con la frecuencia cardiaca (0.22) y la 
                temperatura corporal (0.26), señales de mayor demanda metabólica. Como es esperable, una escala más alta también implica 
                mayor probabilidad de estar recibiendo oxígeno (0.25).
              </p>
              
              <h4>Presión Arterial Sistólica (Systolic BP)</h4>
              <p>
                La presión arterial sistólica muestra una fuerte relación con parámetros de compensación fisiológica. Su correlación 
                inversa con la frecuencia cardiaca (–0.65) evidencia cómo, ante la hipotensión, el organismo responde acelerando el 
                ritmo cardiaco. También tiende a disminuir en contextos febriles (–0.60), dado que los estados infecciosos pueden 
                acompañarse de hipotensión. Además, los pacientes con presión sistólica más baja suelen requerir soporte respiratorio 
                con mayor frecuencia (–0.43).
              </p>
              
              <h4>Frecuencia Cardiaca (Heart Rate)</h4>
              <p>
                La frecuencia cardiaca aumenta notablemente ante la fiebre (0.59), siguiendo una respuesta fisiológica ampliamente 
                documentada. Además, muestra asociación con el uso de oxígeno suplementario (0.43), indicando que la taquicardia es 
                común en pacientes con mayor compromiso clínico o respiratorio.
              </p>
              
              <h4>Temperatura Corporal (Temperature)</h4>
              <p>
                La temperatura corporal mantiene una correlación significativa con la necesidad de soporte respiratorio (0.40). Los 
                estados febriles incrementan la demanda metabólica y pueden generar disfunción fisiológica, lo que explica el aumento 
                en la probabilidad de requerir oxígeno suplementario.
              </p>
            </div>
          </div>
        </section>

        {/* Sección especial de Análisis Ampliado */}
        <section id="analisis-ampliado" className="viz-section">
          <h2>Boxplots de Signos Vitales por Nivel de Riesgo</h2>
          <div style={{overflow: 'auto'}}>
            <div style={{float: 'left', width: '750px', marginRight: '2rem', marginBottom: '1.5rem'}}>
              <img src="/images/anamatriz.png" alt="Análisis Ampliado" loading="lazy" style={{width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}} />
            </div>
            <p style={{textAlign: 'justify'}}>
              Los boxplots muestran una clara relación entre el nivel de riesgo clínico y los signos vitales. A medida que el 
              Risk_Level aumenta, se observa un incremento significativo en la frecuencia respiratoria, frecuencia cardiaca y 
              temperatura corporal, acompañado de una disminución progresiva de la presión arterial sistólica y la saturación de 
              oxígeno. Además, la mayoría de los pacientes de alto riesgo requieren oxígeno suplementario. Estos patrones reflejan 
              un perfil típico de deterioro fisiológico en contextos de sepsis, shock o insuficiencia respiratoria, lo que valida 
              la coherencia clínica del dataset y su utilidad para tareas de clasificación o clustering.
            </p>
          </div>
        </section>

        {/* Sección especial de Distribución de Variables Categóricas */}
        <section id="countplots" className="viz-section">
          <h2>Distribución de Variables Categóricas</h2>
          <div style={{overflow: 'auto'}}>
            <div style={{float: 'left', width: '750px', marginRight: '2rem', marginBottom: '1.5rem'}}>
              <img src="/images/conteovar.png" alt="Distribución de Variables Categóricas" loading="lazy" style={{width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'}} />
            </div>
            <p style={{textAlign: 'justify'}}>
              Los countplots muestran que el nivel de riesgo está relativamente balanceado, con predominio de pacientes Medium y High. 
              La variable Consciousness presenta un fuerte desbalance, ya que la mayoría de los pacientes se encuentran en estado Alert, 
              lo cual limita su utilidad para análisis predictivos. Por otro lado, la variable On_Oxygen presenta una distribución 
              adecuada, con aproximadamente un 27% de pacientes recibiendo oxígeno suplementario, lo que refleja diferencias fisiológicas 
              importantes entre los grupos y aporta valor al análisis de severidad clínica.
            </p>
          </div>
        </section>

        {/* Outliers Fisiológicos - Special section */}
        <section id="outliers" className="viz-section viz-section-special">
          <h2>Boxplots Univariados de Signos Vitales (outliers fisiológicos)</h2>
          <div style={{ overflow: 'auto' }}>
            <img 
              src="/images/outfis.png" 
              alt="Outliers Fisiológicos" 
              style={{ 
                float: 'left', 
                width: '550px', 
                marginRight: '2rem', 
                marginBottom: '1.5rem',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} 
            />
            <p style={{ textAlign: 'justify' }}>
              Los boxplots demostraron que los signos vitales presentan outliers clínicamente plausibles que reflejan estados de deterioro 
              fisiológico real, tales como taquicardia, hipotensión severa, hipertermia e hipoxemia. No se identificaron valores absurdos 
              o fuera de rango fisiológico, lo que sugiere que el dataset es consistente y adecuado para análisis posteriores como clustering 
              o modelos de predicción de riesgo.
            </p>
          </div>
        </section>

        {/* Relación entre Variables - Special section */}
        <section id="relaciones" className="viz-section viz-section-special">
          <h2>Relación entre Variables</h2>
          <div style={{ overflow: 'auto' }}>
            <img 
              src="/images/relacion.png" 
              alt="Relación entre Variables" 
              style={{ 
                float: 'left', 
                width: '750px', 
                marginRight: '2rem', 
                marginBottom: '1.5rem',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} 
            />
            <p style={{ textAlign: 'justify' }}>
              Los stripplots revelan que los pacientes que requieren oxígeno suplementario presentan saturaciones más bajas y mayor variabilidad, 
              validando la utilidad de la variable On_Oxygen como indicador de deterioro respiratorio. Asimismo, los pacientes con menor nivel 
              de conciencia muestran frecuencias cardiacas más elevadas y dispersas, lo que refleja un mayor grado de inestabilidad fisiológica. 
              Estos patrones son consistentes con cuadros de riesgo elevado y confirman la coherencia clínica del dataset.
            </p>
          </div>
        </section>

        </div>
      </main>

      <section className="content-section" id="metodos">
        <div className="section-content">
          <h2>Métodos usados</h2>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            En este análisis se aplicaron varios enfoques de clustering no supervisado para identificar patrones fisiológicos 
            en el dataset de pacientes. A continuación se describen brevemente los principales métodos empleados.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            1. Estandarización de Variables (StandardScaler)
          </h3>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Antes de aplicar cualquier algoritmo de clustering, todas las variables numéricas se escalaron utilizando StandardScaler, 
            el cual transforma cada columna para que tenga media 0 y desviación estándar 1.
          </p>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Los signos vitales tienen escalas distintas (por ejemplo, saturación vs presión arterial). Sin estandarización, 
            las variables con valores más grandes dominarían el cálculo de distancias del clustering.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            2. Reducción de Dimensionalidad (PCA)
          </h3>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            En varios análisis se aplicó PCA (Principal Component Analysis) para proyectar los datos en un espacio de 2 dimensiones. 
            Se hizo con el fin de reducir ruido y redundancia, facilitar la visualización de los clusters, conservar la mayor variabilidad 
            posible en pocos componentes y detectar estructuras naturales en los datos.
          </p>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            PCA no se usa para formar los clusters directamente, sino para visualizarlos e interpretarlos.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            3. K-Means Clustering
          </h3>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            El algoritmo principal utilizado fue K-Means, un método clásico de partición basado en distancia euclidiana.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            4. Visualización de Clusters en PCA
          </h3>
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Después del clustering, se proyectaron los datos en los dos primeros componentes principales de PCA. 
            Permite ver si los clusters están bien separados, facilita comparar los clusters con el nivel de riesgo real, 
            y ayuda a interpretar los fenotipos de cada grupo.
          </p>
        </div>
        
        <div className="viz-container">
          {/* Clustering Fisiológico - Special section */}
          <section id="clustering-fisio" className="viz-section viz-section-special">
            <h2>Clustering Fisiológico (K-Means)</h2>
            <div style={{ overflow: 'auto' }}>
              <img 
                src="/images/clusteringfis.png" 
                alt="Clustering Fisiológico" 
                style={{ 
                  float: 'left', 
                  width: '650px', 
                  marginRight: '2rem', 
                  marginBottom: '1.5rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} 
              />
              <p style={{ textAlign: 'justify' }}>
                El clustering se realizó utilizando cinco signos vitales clave: frecuencia cardiaca, frecuencia respiratoria, saturación de oxígeno, 
                presión arterial sistólica y temperatura. El objetivo fue identificar patrones fisiológicos y compararlos con los niveles de riesgo 
                clínico (Normal, Low, Medium, High).
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 0 agrupa a los pacientes más estables, con signos vitales dentro de rangos normales y buena oxigenación. Representa el 
                perfil de menor severidad y suele concentrar la mayoría de casos Normal y Low. Funciona como el punto de referencia frente a los 
                demás grupos.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 1 muestra un perfil de estrés respiratorio moderado: mayor frecuencia respiratoria, ligera caída de la saturación y 
                temperatura más alta. Estos pacientes podrían estar en fases tempranas de infección o inflamación. Aquí predominan los niveles 
                Medium y algunos Low.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 2 corresponde al grupo más crítico, con taquipnea marcada, hipoxemia severa, taquicardia, hipotensión y fiebre. Este 
                fenotipo coincide con cuadros graves como sepsis o insuficiencia respiratoria. Es el cluster donde se concentran la mayoría de 
                casos High y Medium severos.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 3 incluye pacientes febriles con taquicardia, pero con oxigenación relativamente conservada. Sugiere infecciones o 
                procesos inflamatorios sin compromiso respiratorio extremo. Suele incluir casos Medium y algunos High, aunque menos graves que 
                los del Cluster 2.
              </p>
            </div>
          </section>

          {/* Clustering Hemodinámico - Special section */}
          <section id="clustering-hemo" className="viz-section viz-section-special">
            <h2>Clustering Hemodinámico</h2>
            <div style={{ overflow: 'auto' }}>
              <img 
                src="/images/hemodinamico.png" 
                alt="Clustering Hemodinámico" 
                style={{ 
                  float: 'left', 
                  width: '750px', 
                  marginRight: '2rem', 
                  marginBottom: '1.5rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} 
              />
              <p style={{ textAlign: 'justify' }}>
                El clustering se basó únicamente en variables hemodinámicas y metabólicas —presión arterial sistólica, frecuencia cardiaca 
                y temperatura— con el propósito de identificar patrones de estabilidad o deterioro circulatorio que puedan relacionarse con 
                los niveles de riesgo clínico.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 0 agrupa pacientes con taquicardia y presión arterial baja, un patrón típico de estados tempranos de choque, 
                sepsis o descompensación cardiovascular. Representa un perfil de inestabilidad moderada a alta, donde es esperable encontrar 
                principalmente pacientes Medium y High.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 1 corresponde a los pacientes más estables del conjunto: frecuencia cardiaca y temperatura normales, junto con 
                presión arterial adecuada. Este grupo refleja un fenotipo hemodinámico saludable, cercano al rango fisiológico normal, y 
                suele concentrar casos Normal y Low.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 2 combina fiebre marcada, taquicardia intensa y presión arterial baja, formando un cuadro compatible con 
                inflamación sistémica severa o riesgo elevado de choque séptico. Es el grupo de mayor compromiso clínico y debería incluir 
                una proporción importante de pacientes High.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                El Cluster 3 representa un estado intermedio: taquicardia moderada, presión normal-alta y temperatura ligeramente elevada. 
                Se asocia con infecciones tempranas o estrés metabólico sin hipotensión crítica. Usualmente incluye una mezcla de Low y 
                Medium, con algunos High menos avanzados.
              </p>
            </div>
          </section>

          {/* Signos Vitales Generales - Special section */}
          <section id="signos-vitales" className="viz-section viz-section-special">
            <h2>Signos Vitales Generales</h2>
            <div style={{ overflow: 'auto' }}>
              <img 
                src="/images/signosvi.png" 
                alt="Signos Vitales Generales" 
                style={{ 
                  float: 'left', 
                  width: '750px', 
                  marginRight: '2rem', 
                  marginBottom: '1.5rem',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} 
              />
              <p style={{ textAlign: 'justify' }}>
                Esta sección compara los clusters generados con K-Means —utilizando todos los signos vitales y el nivel de conciencia AVPU— 
                con el nivel de riesgo clínico real del dataset. Para facilitar la interpretación, los datos fueron estandarizados y 
                proyectados en dos dimensiones mediante PCA, permitiendo visualizar con mayor claridad la estructura interna del conjunto 
                de pacientes.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                En la gráfica de la izquierda se observa una separación definida entre los cuatro clusters: uno ubicado en la zona inferior 
                izquierda, otro hacia la región central-derecha, un tercero en la parte superior central y un cuarto en el extremo superior 
                derecho. Esta disposición evidencia que las variables fisiológicas contienen suficiente información para formar grupos 
                diferenciados y coherentes.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                La gráfica de la derecha muestra el nivel de riesgo clínico real sobre el mismo espacio PCA. Los pacientes con riesgo Normal 
                y Low se concentran principalmente en la región inferior izquierda, mientras que los Medium se distribuyen en zonas 
                intermedias entre estabilidad y deterioro. Los pacientes High se sitúan mayoritariamente en el extremo superior derecho, 
                coincidiendo con los clusters más severos. Esta superposición entre clusters y categorías clínicas sugiere que el modelo 
                capta adecuadamente los distintos fenotipos fisiológicos, incluso sin utilizar el nivel de riesgo como entrada.
              </p>
            </div>
          </section>

          {/* Importancia de Características - Special section */}
          <section id="modelo-rf" className="viz-section viz-section-special">
            <h2>Importancia de Características (Random Forest)</h2>
            <div className="figure-card" style={{ marginBottom: '2rem' }}>
              <img src="/images/random.png" alt="Importancia de Características" loading="lazy" />
            </div>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '1.5rem' }}>
              <p style={{ textAlign: 'justify' }}>
                El modelo obtuvo una precisión general (Accuracy) del 96% en el conjunto de prueba. Este es un desempeño sobresaliente, 
                indicando que el modelo es capaz de clasificar correctamente el nivel de riesgo en la gran mayoría de los casos.
              </p>
              
              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
                Métricas de Desempeño por Clase
              </h3>
              <p style={{ textAlign: 'justify' }}>
                El Informe de Clasificación muestra resultados sólidos y consistentes para todas las categorías de riesgo (Normal, Low, 
                Medium, High):
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>Precisión (Precision):</strong> Indica la proporción de predicciones correctas entre todas las predicciones hechas 
                para una clase. Los valores son especialmente altos para las clases Normal y High, ambas con 1.00, lo que refleja una 
                excelente exactitud en sus predicciones.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>Recall:</strong> Mide la capacidad del modelo para identificar correctamente todas las instancias reales de una clase. 
                En todas las categorías se obtuvieron valores de 96% o superiores, lo que implica una muy buena detección de los distintos 
                niveles de riesgo.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>F1-Score:</strong> Combina precisión y recall en una sola métrica. Los valores elevados confirman que el modelo 
                mantiene un equilibrio sólido entre ambas medidas en todas las clases.
              </p>
              
              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
                Importancia de las Características
              </h3>
              <p style={{ textAlign: 'justify' }}>
                El modelo permite identificar qué signos vitales influyen más en la predicción del nivel de riesgo. Las características más 
                relevantes fueron:
              </p>
              
              <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', textAlign: 'justify' }}>
                <li><strong>Oxygen_Saturation (Saturación de Oxígeno):</strong> Importancia de 0.2257, siendo la variable más influyente en la clasificación.</li>
                <li><strong>Heart_Rate (Frecuencia Cardíaca):</strong> Con un peso de 0.2169, muy cercana en relevancia a la saturación de oxígeno.</li>
                <li><strong>Respiratory_Rate (Frecuencia Respiratoria):</strong> Contributo clave con una importancia de 0.1962.</li>
                <li><strong>Systolic_BP (Presión Arterial Sistólica):</strong> Con un peso de 0.1720, también representa una señal fisiológica significativa para el modelo.</li>
                <li><strong>Temperature (Temperatura):</strong> Importancia de 0.1493, demostrando ser un factor clínico relevante.</li>
              </ul>
              
              <p style={{ textAlign: 'justify' }}>
                Otras variables como On_Oxygen, O2_Scale y Consciousness_numeric tienen menor influencia, aunque siguen aportando información 
                útil para mejorar la capacidad predictiva del modelo.
              </p>
            </div>
          </section>

          {/* Matriz de Confusión - Special section */}
          <section id="matriz-confusion" className="viz-section viz-section-special">
            <h2>Matriz de Confusión</h2>
            <div className="figure-card" style={{ marginBottom: '2rem' }}>
              <img src="/images/confu.png" alt="Matriz de Confusión" loading="lazy" />
            </div>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '1.5rem' }}>
              <p style={{ textAlign: 'justify' }}>
                La matriz de confusión permite evaluar el desempeño del modelo comparando las etiquetas verdaderas (filas) con las etiquetas 
                predichas (columnas). A partir de ella se pueden identificar los aciertos y los tipos de error cometidos para cada clase de riesgo.
              </p>
              
              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
                Resultados por Clase
              </h3>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>Normal:</strong> El modelo clasificó correctamente 46 pacientes como Normal. Solo 2 pacientes que realmente pertenecían 
                a esta categoría fueron clasificados erróneamente como de riesgo Low.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>Low (Bajo):</strong> De los 76 pacientes con riesgo Low real, el modelo predijo correctamente 73. Hubo 3 casos 
                clasificados incorrectamente como Medium.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>Medium (Medio):</strong> El modelo identificó correctamente 88 de los 92 pacientes con riesgo Medium. Los 4 errores 
                correspondieron a predicciones clasificadas como Low.
              </p>
              
              <p style={{ textAlign: 'justify' }}>
                <strong>High (Alto):</strong> Entre los 84 pacientes con riesgo High real, el modelo predijo correctamente 81. Solo 3 fueron 
                clasificados erróneamente como Medium.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="content-section" id="conclusiones">
        <div className="section-content">
          <h2>Conclusiones</h2>
          
          <p style={{ textAlign: 'justify', marginTop: '1.5rem', color: '#1a1f27' }}>
            Este proyecto desarrolló un análisis integral de signos vitales en pacientes de UCI con el objetivo de identificar patrones 
            fisiológicos asociados al riesgo clínico mediante técnicas de clustering no supervisado y modelos predictivos supervisados. 
            Los resultados obtenidos demuestran la viabilidad y utilidad de aplicar métodos de Machine Learning en el contexto clínico 
            para mejorar la estratificación de riesgo y el apoyo a la toma de decisiones médicas.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            Hallazgos Principales
          </h3>
          
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            El análisis exploratorio confirmó que el dataset es consistente y clínicamente coherente, con outliers fisiológicamente 
            plausibles que reflejan estados reales de deterioro. Las variables respiratorias y hemodinámicas presentaron correlaciones 
            esperables desde el punto de vista médico, validando la calidad de los datos recolectados.
          </p>
          
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Los métodos de clustering (K-Means) aplicados sobre diferentes combinaciones de variables identificaron exitosamente 
            fenotipos fisiológicos diferenciados: desde pacientes estables con signos vitales normales, hasta grupos críticos con 
            hipoxemia severa, hipotensión y fiebre. Estos perfiles se alinearon de manera natural con los niveles oficiales de riesgo 
            (Normal, Low, Medium, High), demostrando que los signos vitales contienen información estructurada suficiente para 
            discriminar entre estados clínicos.
          </p>
          
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            El modelo predictivo basado en Random Forest alcanzó una precisión del 96%, con métricas de desempeño sobresalientes en 
            todas las clases de riesgo. Las variables más influyentes identificadas fueron la saturación de oxígeno, la frecuencia 
            cardiaca y la frecuencia respiratoria, coincidiendo con parámetros clínicamente reconocidos como indicadores críticos de 
            deterioro fisiológico. La matriz de confusión reveló que los errores del modelo tienden a ocurrir entre clases adyacentes, 
            comportamiento esperado en escalas de severidad progresiva y clínicamente aceptable.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            Implicaciones Clínicas
          </h3>
          
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Los resultados sugieren que los modelos de Machine Learning pueden servir como herramientas complementarias en la 
            monitorización continua de pacientes críticos, facilitando la detección temprana de deterioro clínico y la priorización 
            de recursos médicos. La identificación de fenotipos mediante clustering permite personalizar intervenciones según el perfil 
            fisiológico del paciente, mientras que el modelo predictivo ofrece una estimación confiable del nivel de riesgo que puede 
            integrarse en sistemas de alerta hospitalaria.
          </p>
          
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Es importante destacar que estos modelos no reemplazan el juicio clínico del personal médico, sino que funcionan como 
            sistemas de apoyo a la decisión que permiten procesar grandes volúmenes de datos en tiempo real y destacar casos que 
            requieren atención inmediata.
          </p>
          
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 600, color: '#c41e3a' }}>
            Conclusión Final
          </h3>
          
          <p style={{ textAlign: 'justify', color: '#1a1f27' }}>
            Este proyecto demuestra que la integración de métodos de análisis de datos y Machine Learning en el contexto de cuidados 
            intensivos es no solo factible, sino altamente prometedora. Los resultados obtenidos validan el uso de clustering para 
            identificar fenotipos clínicos y confirman la capacidad de los modelos supervisados para predecir niveles de riesgo con 
            alta precisión. Con el desarrollo continuo de estas herramientas y su adaptación a entornos clínicos reales, es posible 
            contribuir significativamente a la mejora de los resultados en pacientes críticos, optimizando la asignación de recursos 
            y reduciendo los tiempos de respuesta ante situaciones de deterioro clínico.
          </p>
        </div>
      </section>

      <footer className="footer-simple">
        © 2025 Proyecto Final, Universidad del Norte. Desarrollado por Justine Barreto y Andrés Evertsz.
      </footer>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Volver arriba">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
