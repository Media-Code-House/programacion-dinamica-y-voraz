# Miniproyecto de Programación Dinámica y Algoritmos Voraces

## 1. Introducción
El presente miniproyecto tiene como objetivo principal enfrentar a los estudiantes del curso al diseño de la solución de un problema, utilizando Programación Dinámica y/o Algoritmos Voraces. Además, se pretende alcanzar los siguientes objetivos específicos:

- Realizar análisis de complejidad de las operaciones que permiten solucionar el problema.
- Conocer los tiempos de cómputo que se obtienen al incorporar las técnicas Dinámica y Voraz en la solución de problemas de optimización.
- Implementar en un lenguaje de alto nivel los algoritmos como solución a un problema.

## 2. El Problema
Se desea realizar un viaje en bus a lo largo de `n` ciudades, todas cuentan con terminal de transporte, en cada uno de los cuales se puede comprar tiquete para ir a otro terminal de transporte que está más adelante en la ruta. No se puede devolver en este viaje. Una tabla de tarifas indica los costos de viajar entre los distintos embarcaderos. Se supone que puede ocurrir que un viaje entre `i` y `j` salga más barato haciendo escala en `k` embarcaderos que yendo directamente.

El problema consistirá en determinar la forma de viajar con costo mínimo entre un par de ciudades (o sus terminales de transporte).

Vamos a llamar a la tabla de tarifas, T. Así, T[i,j] será el costo de ir del embarcadero `i` al `j`. La matriz será triangular superior de orden `n`, donde `n` es el número de ciudades.

## 3. Consideraciones
a. Caracterice la estructura de una solución óptima, esto es, describa el conjunto de subproblemas para los cuales será necesario calcular las soluciones óptimas.

b. Defina recursivamente el costo de una solución óptima para cada subproblema definido en el literal anterior.

c. Escriba un algoritmo (e impleméntelo en el lenguaje de su preferencia) que calcule el costo de una solución óptima al problema original.

d. Construya una solución óptima, para lo cual se requiere:

- Incluir en algún punto del algoritmo anterior, si es necesario, una estructura que le permita construir una solución óptima.
- Un algoritmo que recorra esa estructura construyendo (o imprimiendo) una solución de costo óptimo.

e. Analice la complejidad para los algoritmos planteados.

f. Proponga un algoritmo voraz, donde se identifiquen los cuatro elementos característicos (conjunto de elegibles, función de selección, conjunto de elegidos y función objetivo).

g. Considerando el algoritmo voraz propuesto, usted debe demostrar o refutar que se logra la solución óptima con la ejecución de dicho algoritmo, y analizar su complejidad.