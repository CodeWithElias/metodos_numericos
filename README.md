# Métodos Numéricos - Método de Brent

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web interactiva desarrollada como trabajo final para la materia **Métodos Numéricos (MAT-205)** de la **Universidad Autónoma "Gabriel René Moreno"**. La aplicación implementa el **Método de Brent** para encontrar raíces de funciones matemáticas, proporcionando una interfaz intuitiva con visualización gráfica y análisis detallado de iteraciones.

El Método de Brent combina las técnicas de bisección, secante e interpolación cuadrática inversa para lograr una convergencia rápida y robusta en la búsqueda de raíces.

## 🎯 Características Principales

### ✨ Funcionalidades
- **Cálculo de Raíces**: Implementación precisa del método de Brent
- **Validación en Tiempo Real**: Verificación de entradas y funciones matemáticas
- **Visualización Gráfica**: Gráficos interactivos usando Chart.js
- **Tabla de Iteraciones**: Seguimiento detallado de cada paso del algoritmo
- **Interfaz Responsiva**: Diseño moderno con efectos glassmorphism
- **Validación de Entradas**: Mensajes de error claros y validación automática

### 🔧 Características Técnicas
- **Convergencia Robusta**: Combina múltiples métodos numéricos
- **Precisión Configurable**: Tolerancias personalizables en X e Y
- **Cifras Significativas**: Control de precisión en la presentación de resultados
- **Manejo de Errores**: Detección de funciones constantes y intervalos inválidos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Framework principal para la interfaz de usuario
- **TypeScript**: Tipado estático para mayor robustez
- **Vite**: Herramienta de desarrollo rápida y moderna
- **React Router DOM**: Navegación entre vistas
- **Chart.js + React-Chartjs-2**: Visualización de gráficos
- **Math.js**: Evaluación y compilación de expresiones matemáticas

### Estilos y UI
- **CSS Variables**: Sistema de diseño consistente
- **Glassmorphism**: Efectos visuales modernos
- **Soft UI**: Sombras y gradientes para profundidad
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla

### Desarrollo
- **ESLint**: Linting y calidad de código
- **TypeScript Compiler**: Verificación de tipos
- **Vite Build System**: Optimización y empaquetado

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
- **Raíz encontrada**: Valor aproximado de la raíz
- **Valor f(x) en la raíz**: Verificación de cercanía a cero
- **Tabla de iteraciones**: Paso a paso del algoritmo
- **Gráfico**: Visualización de la función y la raíz encontrada

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
│   │   ├── ResultsTable.tsx     # Tabla de resultados
│   │   └── layout/             # Componentes de layout
│   │       ├── Layout.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Layout.css
│   │       └── Sidebar.css
│   ├── logic/             # Lógica de negocio
│   │   └── brent.ts       # Implementación del método de Brent
│   ├── types/             # Definiciones TypeScript
│   │   ├── index.ts       # Tipos principales
│   │   └── views/         # Vistas de la aplicación
│   │       ├── BrentView.tsx
│   │       ├── DashboardView.tsx
│   │       ├── BrentView.css
│   │       └── DashboardView.css
│   ├── App.tsx            # Componente principal
│   ├── App.css
│   ├── index.css          # Estilos globales
│   └── main.tsx           # Punto de entrada
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

Este proyecto es de carácter académico y está destinado únicamente para fines educativos. Todos los derechos reservados a los autores y la institución educativa.

## 🤝 Contribución

Como proyecto académico, las contribuciones externas no están previstas. Sin embargo, el código fuente está disponible para estudio y referencia.

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

---

**Desarrollado con ❤️ para la Universidad Autónoma "Gabriel René Moreno"**
