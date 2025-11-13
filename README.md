# Métodos Numéricos - Método de Brent

## 📋 Descripción del Proyecto

## 📖 Menú de Navegación

- [📋 Descripción del Proyecto](#-descripción-del-proyecto)
- [🎯 Características Principales](#-características-principales)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📦 Instalación y Configuración](#-instalación-y-configuración)
- [🚀 Uso de la Aplicación](#-uso-de-la-aplicación)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔬 Algoritmo del Método de Brent](#-algoritmo-del-método-de-brent)
- [👥 Equipo de Desarrollo](#-equipo-de-desarrollo)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [📞 Soporte](#-soporte)
- [🎉 Estado del Proyecto](#-estado-del-proyecto)
- [🔗 Enlaces Relacionados](#-enlaces-relacionados)

---

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web interactiva desarrollada como trabajo final para la materia **Métodos Numéricos (MAT-205)** de la **Universidad Autónoma "Gabriel René Moreno"**. La aplicación implementa el **Método de Brent** para encontrar raíces de funciones matemáticas, proporcionando una interfaz intuitiva con visualización gráfica y análisis detallado de iteraciones.

El Método de Brent combina las técnicas de bisección, secante e interpolación cuadrática inversa para lograr una convergencia rápida y robusta en la búsqueda de raíces.

## 🎯 Características Principales

### ✨ Funcionalidades
- **Cálculo de Raíces**: Implementación precisa del método de Brent
- **Validación en Tiempo Real**: Verificación de entradas y funciones matemáticas
- **Visualización Gráfica**: Gráficos interactivos usando Chart.js
- **Tabla de Iteraciones**: Seguimiento detallado de cada paso del algoritmo
- **Modal Interactivo**: Análisis paso a paso con fórmulas matemáticas (KaTeX)
- **Interfaz Responsiva**: Diseño moderno con efectos glassmorphism
- **Validación de Entradas**: Mensajes de error claros y validación automática
- **Suite de Pruebas**: Tests exhaustivos para validar la precisión matemática

### 🔧 Características Técnicas
- **Convergencia Robusta**: Combina múltiples métodos numéricos (bisección, secante, IQI)
- **Precisión Configurable**: Tolerancias personalizables en X e Y
- **Cifras Significativas**: Control de precisión en la presentación de resultados
- **Manejo de Errores**: Detección de funciones constantes y intervalos inválidos
- **Optimización de Espaciado**: Layout compacto y eficiente para mejor usabilidad
- **TypeScript**: Tipado estático completo para mayor robustez
- **Testing Automatizado**: Suite de pruebas con casos matemáticos validados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Framework principal para la interfaz de usuario
- **TypeScript**: Tipado estático completo para mayor robustez
- **Vite**: Herramienta de desarrollo rápida y moderna
- **React Router DOM**: Navegación entre vistas
- **Chart.js + React-Chartjs-2**: Visualización de gráficos interactivos
- **Math.js**: Evaluación y compilación de expresiones matemáticas
- **KaTeX + React-KaTeX**: Renderizado de fórmulas matemáticas

### Estilos y UI
- **CSS Variables**: Sistema de diseño consistente con paleta profesional
- **Glassmorphism**: Efectos visuales modernos y backdrop-filter
- **Soft UI**: Sombras y gradientes para profundidad visual
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Optimización de Espaciado**: Layout compacto para mejor eficiencia de espacio

### Desarrollo y Testing
- **ESLint**: Linting y calidad de código
- **TypeScript Compiler**: Verificación de tipos estricta
- **Vite Build System**: Optimización y empaquetado
- **TSX**: Ejecutor de TypeScript para Node.js
- **Suite de Pruebas**: Tests automatizados con casos matemáticos validados

## 📦 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn** como gestor de paquetes

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd metodos_numericos
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Accede a la aplicación:**
   - Abre tu navegador en `http://localhost:5173`

### Construcción para Producción

```bash
# Construir la aplicación
npm run build

# Vista previa de la build
npm run preview
```

### Ejecutar Tests

```bash
# Ejecutar suite de pruebas del método de Brent
npx tsx test_brent.js
```

## 🚀 Uso de la Aplicación

### 1. Página Principal (Dashboard)
- Información del proyecto y equipo de desarrollo
- Enlace directo a la calculadora del método de Brent

### 2. Calculadora del Método de Brent

#### Entrada de Parámetros:
- **Función f(x)**: Expresión matemática (ej: `x^3 - x - 2`)
- **Límite inferior (a)**: Valor inicial del intervalo
- **Límite superior (b)**: Valor final del intervalo
- **Tolerancia en x**: Precisión en la variable independiente
- **Tolerancia en y**: Precisión en la función evaluada
- **Cifras Significativas**: Dígitos a mostrar en resultados

#### Sintaxis de Funciones:
La aplicación soporta expresiones matemáticas estándar:
- Operadores: `+`, `-`, `*`, `/`, `^`
- Funciones: `sin()`, `cos()`, `tan()`, `exp()`, `log()`, `sqrt()`
- Constantes: `pi`, `e`

#### Ejemplos de Funciones:
- `x^2 - 4` (raíz en x = 2)
- `sin(x)` (raíz en x = 0)
- `x^3 - x - 2` (raíz ≈ 1.769)
- `exp(x) - 2` (raíz en x = ln(2))

### 3. Resultados
- **Raíz encontrada**: Valor aproximado de la raíz con precisión configurable
- **Valor f(x) en la raíz**: Verificación de cercanía a cero (debe ser ≈ 0)
- **Tabla de iteraciones**: Paso a paso del algoritmo con método usado en cada iteración
- **Gráfico interactivo**: Visualización de la función completa y raíz marcada
- **Modal detallado**: Análisis matemático completo de cada iteración con fórmulas

## 📁 Estructura del Proyecto

```
metodos_numericos/
├── public/                 # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── assets/            # Recursos gráficos
│   ├── components/        # Componentes reutilizables
│   │   ├── FunctionGraph.tsx    # Gráfico de funciones
│   │   ├── ImputForm.tsx        # Formulario de entrada
│   │   ├── IterationModal.tsx   # Modal de análisis detallado
│   │   ├── ResultsTable.tsx     # Tabla de resultados
│   │   └── layout/             # Componentes de layout
│   │       ├── Layout.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Layout.css
│   │       └── Sidebar.css
│   ├── logic/             # Lógica de negocio
│   │   └── brent.ts       # Implementación del método de Brent
│   ├── types/             # Definiciones TypeScript
│   │   └── index.ts       # Tipos principales
│   ├── views/             # Vistas de la aplicación
│   │   ├── BrentView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── BrentView.css
│   │   └── DashboardView.css
│   ├── App.tsx            # Componente principal
│   ├── App.css
│   ├── index.css          # Estilos globales
│   └── main.tsx           # Punto de entrada
├── test_brent.js          # Suite de pruebas automatizadas
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración Vite
└── README.md             # Esta documentación
```

## 🔬 Algoritmo del Método de Brent

### Descripción Matemática
El método de Brent es un algoritmo híbrido que combina:
1. **Método de Bisección**: Garantiza convergencia
2. **Método de la Secante**: Acelera la convergencia
3. **Interpolación Cuadrática Inversa (IQI)**: Mayor velocidad en casos favorables

### Ventajas
- **Convergencia garantizada**: Como la bisección
- **Rapidez**: Como los métodos de interpolación
- **Robustez**: Maneja casos difíciles donde otros métodos fallan

### Implementación Técnica
```typescript
function solveBrent(
  f: CompiledFunction,
  a: number,
  b: number,
  tolX: number = 1e-6,
  tolY: number = 1e-6,
  maxIter: number = 100
): BrentResult
```

### Parámetros
- `f`: Función a evaluar
- `a`, `b`: Límites del intervalo inicial
- `tolX`: Tolerancia en la variable x
- `tolY`: Tolerancia en f(x)
- `maxIter`: Máximo número de iteraciones

## 👥 Equipo de Desarrollo

**Proyecto Final - Métodos Numéricos (MAT-205)**

### Integrantes:
- **Anabel Esmeralda León Tupa** (215169867)
- **Oliver Gutierrez Lucas** (220038694)
- **María Jimena Ríos Cordova** (222068566)
- **Luis Fernando Iturralde Cusicanqui** (200337939)
- **Esequiel Ríos Rengifo** (218133359)
- **Elias Puma Claure** (220035415)

### Docente:
**Ing. Luis Antonio Gianella Peredo**

### Institución:
**Universidad Autónoma "Gabriel René Moreno"**

## 📄 Licencia

Este proyecto es de carácter académico y está destinado para fines educativos. El código fuente está disponible bajo la licencia MIT para estudio, modificación y distribución no comercial.

### ⚖️ Términos de Uso
- Uso educativo autorizado
- Atribución requerida a los autores originales
- Modificaciones permitidas con fines académicos
- Distribución no comercial

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Este proyecto está abierto a mejoras y extensiones por parte de la comunidad académica y desarrolladores interesados en métodos numéricos.

### 🚀 Cómo Contribuir

#### 1. Preparación del Entorno
```bash
# Clona el repositorio
git clone <url-del-repositorio>
cd metodos_numericos

# Instala dependencias
npm install

# Ejecuta los tests para verificar que todo funciona
npx tsx test_brent.js
```

#### 2. Desarrollo
- Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
- Sigue las convenciones de código existentes
- Agrega tests para nuevas funcionalidades
- Asegúrate de que todos los tests pasen

#### 3. Pull Request
- Describe claramente los cambios realizados
- Incluye capturas de pantalla si hay cambios visuales
- Referencia issues relacionados si aplica

### 📋 Áreas de Contribución Sugeridas

#### 🔬 Mejoras Algorítmicas
- Optimización del método de Brent
- Implementación de otros métodos numéricos
- Mejora de la precisión y estabilidad

#### 🎨 Mejoras de UI/UX
- Nuevos temas visuales
- Mejor responsividad móvil
- Accesibilidad (WCAG)
- Animaciones y transiciones

#### 🧪 Testing y Validación
- Más casos de prueba
- Benchmarks de performance
- Validación cruzada con otras implementaciones

#### 📚 Documentación
- Tutoriales adicionales
- Ejemplos de uso avanzado
- Documentación de API

### 📝 Guías de Estilo

#### TypeScript
- Usa tipos estrictos en todas las funciones
- Documenta interfaces y tipos complejos
- Mantén consistencia con el código existente

#### CSS
- Usa CSS variables para colores y espaciado
- Sigue la metodología BEM para clases
- Prioriza flexbox/grid sobre floats

#### Commits
- Usa mensajes descriptivos en inglés
- Prefija con tipo: `feat:`, `fix:`, `docs:`, `test:`
- Ejemplo: `feat: add cubic function convergence test`

### 🐛 Reporte de Bugs

Para reportar bugs, por favor incluye:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Capturas de pantalla si aplica
- Información del entorno (navegador, OS, Node.js)

### 📞 Contacto

Para contribuciones o preguntas:
- Abre un Issue en el repositorio
- Contacta al equipo de desarrollo
- Docente responsable: Ing. Luis Antonio Gianella Peredo

## 📞 Soporte

Para preguntas o problemas relacionados con el proyecto, contactar al docente responsable:

**Ing. Luis Antonio Gianella Peredo**
- Materia: Métodos Numéricos (MAT-205)
- Universidad Autónoma "Gabriel René Moreno"

## 🔗 Enlaces Relacionados

- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Chart.js](https://www.chartjs.org/)
- [Documentación de Math.js](https://mathjs.org/)

## 🎉 Estado del Proyecto

### ✅ Características Completadas
- ✅ Implementación completa del método de Brent
- ✅ Interfaz web moderna y responsiva
- ✅ Visualización gráfica interactiva
- ✅ Modal de análisis detallado con KaTeX
- ✅ Suite de pruebas automatizadas
- ✅ Optimización de espaciado y layout
- ✅ Documentación completa actualizada
- ✅ Guías de contribución abiertas

### 🚀 Próximas Versiones
- Implementación de otros métodos numéricos
- Temas visuales adicionales
- Exportación de resultados
- API REST para cálculos
- Aplicación móvil nativa

---

**Desarrollado con ❤️ para la Universidad Autónoma "Gabriel René Moreno"**

**🏆 Proyecto Final - Métodos Numéricos (MAT-205)**
