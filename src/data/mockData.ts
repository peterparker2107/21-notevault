import { PYQPaper, FormulaSnippet } from '../types';

export const INITIAL_PAPERS: PYQPaper[] = [
  {
    id: 'pyq-ucs406-est-2024',
    courseCode: 'UCS406',
    courseTitle: 'Data Structures & Algorithms',
    department: 'CSE',
    semester: 4,
    examType: 'EST',
    year: '2024',
    credits: 4,
    totalMarks: 50,
    timeLimitMins: 180,
    difficulty: 'Challenging',
    questionsCount: 5,
    hasVerifiedSolution: true,
    views: 4890,
    downloads: 1240,
    syllabusModule: 'Trees, Dynamic Programming & Graph Traversals',
    questions: [
      {
        qNum: 'Q1(a)',
        marks: 5,
        prompt: 'Given an AVL tree with height h, derive the recurrence relation for the minimum number of nodes N(h). Hence prove that h = O(log n).',
        latexFormula: 'N(h) = N(h-1) + N(h-2) + 1, \\quad \\text{with } N(0)=1, N(1)=2',
        solutions: [
          {
            id: 'sol-ucs406-1',
            authorName: 'Dr. Rajesh Khanna',
            authorRoll: 'Faculty / Verified',
            authorBadge: 'Professor Verified',
            verified: true,
            upvotes: 412,
            downvotes: 3,
            postedDate: '14 Dec 2024',
            stepByStep: [
              'Base Cases: For h = 0, minimum node is 1 (root alone): N(0) = 1. For h = 1, root with one child gives N(1) = 2.',
              'Recursive step: To minimize nodes for height h, one subtree must have height h-1 and the other h-2 with minimum nodes: N(h) = N(h-1) + N(h-2) + 1.',
              'Observe that N(h) + 1 = (N(h-1) + 1) + (N(h-2) + 1). Let F(h) = N(h) + 1, which represents the Fibonacci sequence.',
              'Since F_n = O(phi^h) where phi = (1 + sqrt(5))/2 ≈ 1.618, we have N(h) > phi^h - 1.',
              'Taking logarithms on both sides: h < 1.44 log_2(N + 1). Therefore, h = O(log N).'
            ],
            finalAnswer: 'h <= 1.4404 * log_2(n + 1) = O(log n). Height is strictly logarithmic.',
            keyFormulas: ['N(h) = N(h-1) + N(h-2) + 1', '\\phi = \\frac{1+\\sqrt{5}}{2} \\approx 1.618'],
            tips: 'Always mention base cases N(0)=1 and N(1)=2 explicitly; 1 mark is reserved for the Fibonacci mapping.'
          },
          {
            id: 'sol-ucs406-2',
            authorName: 'Aarav Sharma',
            authorRoll: '102103342 (Senior TA)',
            authorBadge: 'Top 1% Senior TA',
            verified: true,
            upvotes: 189,
            downvotes: 5,
            postedDate: '16 Dec 2024',
            stepByStep: [
              'Sketch an unbalanced AVL tree candidate with height 0, 1, 2, 3.',
              'Form the Fibonacci relation F_{h+2} = F_{h+1} + F_h.',
              'Substitute and solve with golden ratio exponentiation.'
            ],
            finalAnswer: 'AVL max height is ~1.44 log2(N)',
            keyFormulas: ['F_h = (\\phi^h - \\psi^h) / \\sqrt{5}'],
            tips: 'Quick method for 2-mark quiz checks.'
          }
        ]
      },
      {
        qNum: 'Q2',
        marks: 10,
        prompt: 'Design an O(V + E) algorithm to find the articulation points (cut vertices) in a connected undirected graph using Depth First Search (DFS). Illustrate discovery time and low-link values.',
        latexFormula: 'low[u] = \\min(disc[u], \\min_{(u,v) \\in \\text{tree}} low[v], \\min_{(u,w) \\in \\text{back}} disc[w])',
        solutions: [
          {
            id: 'sol-ucs406-q2',
            authorName: 'Simran Kaur',
            authorRoll: '102203089',
            authorBadge: 'Peer Top-Voted',
            verified: true,
            upvotes: 275,
            downvotes: 4,
            postedDate: '18 Dec 2024',
            stepByStep: [
              '1. Maintain two arrays: disc[u] (discovery time in DFS tree) and low[u] (lowest discovery time reachable via subtree and at most one back-edge).',
              '2. Condition 1: If root of DFS tree has >= 2 children, root is an articulation point.',
              '3. Condition 2: For any non-root vertex u, if there exists a child v such that low[v] >= disc[u], then u is an articulation point (v cannot reach any ancestor of u without passing through u).',
              '4. Single DFS traversal processes all edges in O(V + E) time and O(V) auxiliary space.'
            ],
            finalAnswer: 'Vertex u is a cut vertex if: (isRoot && children > 1) || (!isRoot && low[child] >= disc[u]). Time: O(V + E).',
            keyFormulas: ['low[u] = \\min(disc[u], low[v], disc[w])'],
            tips: 'Do not forget the back-edge condition low[u] = min(low[u], disc[w]). Using low[w] instead of disc[w] is a common pitfall!'
          }
        ]
      }
    ]
  },
  {
    id: 'pyq-uec404-mst1-2024',
    courseCode: 'UEC404',
    courseTitle: 'Analog Electronic Circuits',
    department: 'ECE',
    semester: 4,
    examType: 'MST-1',
    year: '2024',
    credits: 4,
    totalMarks: 25,
    timeLimitMins: 90,
    difficulty: 'Moderate',
    questionsCount: 4,
    hasVerifiedSolution: true,
    views: 3120,
    downloads: 870,
    syllabusModule: 'BJT Small Signal Analysis & Cascaded Amplifiers',
    questions: [
      {
        qNum: 'Q1',
        marks: 7,
        prompt: 'In a Common Emitter (CE) amplifier with unbypassed emitter resistor R_E, derive the exact expressions for voltage gain A_v and input impedance R_in using the hybrid-pi model.',
        latexFormula: 'A_v = -\\frac{\\beta R_C}{r_\\pi + (1+\\beta)R_E} \\approx -\\frac{R_C}{r_e + R_E}',
        solutions: [
          {
            id: 'sol-uec404-1',
            authorName: 'Dr. Alpana Agarwal',
            authorRoll: 'Faculty / Verified',
            authorBadge: 'Professor Verified',
            verified: true,
            upvotes: 384,
            downvotes: 1,
            postedDate: '28 Sep 2024',
            stepByStep: [
              'Draw the hybrid-pi equivalent: input terminal B, base resistor r_pi, controlled current source g_m * v_be, emitter resistor R_E to ground.',
              'Calculate input resistance seen from base: R_ib = v_b / i_b = (i_b * r_pi + (1+beta)*i_b*R_E) / i_b = r_pi + (1+beta)R_E.',
              'Calculate overall input impedance: R_in = R1 || R2 || [r_pi + (1+beta)R_E].',
              'Output voltage v_o = -i_c * R_C = -beta * i_b * R_C.',
              'Voltage gain A_v = v_o / v_b = (-beta * i_b * R_C) / (i_b * [r_pi + (1+beta)R_E]) = -beta * R_C / [r_pi + (1+beta)R_E].'
            ],
            finalAnswer: 'A_v = -g_m * R_C / (1 + g_m * R_E) ≈ -R_C / R_E; R_in = R_B || [r_pi + (1+beta)R_E].',
            keyFormulas: ['g_m = \\frac{I_C}{V_T}', 'r_\\pi = \\frac{\\beta}{g_m}', 'A_v \\approx -\\frac{R_C}{R_E}'],
            tips: 'State thermal voltage V_T = 26mV at 300K for numerical parts.'
          }
        ]
      }
    ]
  },
  {
    id: 'pyq-ues012-mst2-2023',
    courseCode: 'UES012',
    courseTitle: 'Engineering Materials',
    department: 'MECH',
    semester: 2,
    examType: 'MST-2',
    year: '2023',
    credits: 3,
    totalMarks: 25,
    timeLimitMins: 90,
    difficulty: 'Moderate',
    questionsCount: 4,
    hasVerifiedSolution: true,
    views: 2450,
    downloads: 640,
    syllabusModule: 'Iron-Carbon Equilibrium Diagram & Phase Transformations',
    questions: [
      {
        qNum: 'Q2(b)',
        marks: 8,
        prompt: 'Sketch the Fe-Fe3C phase diagram up to 6.67% Carbon. Identify the Eutectic, Eutectoid, and Peritectic invariant reactions with their respective temperatures and phase compositions.',
        latexFormula: '\\text{Eutectoid: } \\gamma(0.76\\% C) \\xrightarrow{727^\\circ C} \\alpha(0.022\\% C) + Fe_3C(6.67\\% C)',
        solutions: [
          {
            id: 'sol-ues012-1',
            authorName: 'Rohan Mehra',
            authorRoll: '102208012',
            authorBadge: 'Top 1% Senior TA',
            verified: true,
            upvotes: 219,
            downvotes: 2,
            postedDate: '12 Nov 2023',
            stepByStep: [
              '1. Peritectic reaction at 1495°C: Liquid (0.53% C) + Delta-ferrite (0.09% C) -> Austenite (gamma, 0.17% C).',
              '2. Eutectic reaction at 1147°C: Liquid (4.3% C) -> Austenite (gamma, 2.14% C) + Cementite (Fe3C, 6.67% C) [Ledeburite].',
              '3. Eutectoid reaction at 727°C: Austenite (gamma, 0.76% C) -> Ferrite (alpha, 0.022% C) + Cementite (Fe3C, 6.67% C) [Pearlite].'
            ],
            finalAnswer: 'All 3 invariant reactions labeled with temperature, compositions, and microstructure names (Ledeburite, Pearlite).',
            keyFormulas: ['L + \\delta \\rightleftharpoons \\gamma \\;(1495^\\circ C)', 'L \\rightleftharpoons \\gamma + Fe_3C \\;(1147^\\circ C)', '\\gamma \\rightleftharpoons \\alpha + Fe_3C \\;(727^\\circ C)'],
            tips: 'Highlight the 727°C eutectoid line as A1 and 912°C-727°C boundary as A3 for full marks.'
          }
        ]
      }
    ]
  },
  {
    id: 'pyq-ucs503-est-2023',
    courseCode: 'UCS503',
    courseTitle: 'Software Engineering & Agile Methodologies',
    department: 'COE',
    semester: 5,
    examType: 'EST',
    year: '2023',
    credits: 4,
    totalMarks: 50,
    timeLimitMins: 180,
    difficulty: 'Easy',
    questionsCount: 5,
    hasVerifiedSolution: true,
    views: 3980,
    downloads: 1110,
    syllabusModule: 'Agile Estimation, COCOMO II, Cyclomatic Complexity',
    questions: [
      {
        qNum: 'Q3',
        marks: 6,
        prompt: 'Calculate McCabe\'s Cyclomatic Complexity V(G) for a control flow graph having 14 edges and 11 nodes with 1 connected component. Also verify using predicate nodes.',
        latexFormula: 'V(G) = E - N + 2P = P_n + 1',
        solutions: [
          {
            id: 'sol-ucs503-1',
            authorName: 'Er. Jaspreet Singh',
            authorRoll: '102003190 (Alum)',
            authorBadge: 'Peer Top-Voted',
            verified: true,
            upvotes: 310,
            downvotes: 1,
            postedDate: '10 Dec 2023',
            stepByStep: [
              'Formula 1: V(G) = E - N + 2P where E = edges, N = nodes, P = connected components.',
              'Given E = 14, N = 11, P = 1: V(G) = 14 - 11 + 2(1) = 3 + 2 = 5.',
              'Formula 2 verification: V(G) = Predicate nodes + 1. If 4 decision branches exist, 4 + 1 = 5.',
              'Formula 3: V(G) = Number of bounded regions + 1 = 4 enclosed regions + 1 outer region = 5.'
            ],
            finalAnswer: 'Cyclomatic Complexity V(G) = 5 linearly independent test paths required.',
            keyFormulas: ['V(G) = E - N + 2P', 'V(G) = \\text{Predicate Nodes} + 1'],
            tips: 'Remember to mention that V(G) defines the upper bound on the number of unit test cases required for complete branch coverage.'
          }
        ]
      }
    ]
  },
  {
    id: 'pyq-uee001-mst1-2024',
    courseCode: 'UEE001',
    courseTitle: 'Electrical Engineering Essentials',
    department: 'EE',
    semester: 1,
    examType: 'MST-1',
    year: '2024',
    credits: 3,
    totalMarks: 25,
    timeLimitMins: 90,
    difficulty: 'Moderate',
    questionsCount: 4,
    hasVerifiedSolution: true,
    views: 5200,
    downloads: 1890,
    syllabusModule: 'AC Steady-State Analysis & Three-Phase Power',
    questions: [
      {
        qNum: 'Q1',
        marks: 8,
        prompt: 'A balanced 3-phase star connected load of impedance Z_L = 16 + j12 Ohm per phase is fed from a 415V, 50Hz supply. Calculate Phase voltage, Phase current, Line current, Active power, and Power Factor.',
        latexFormula: 'P = \\sqrt{3} V_L I_L \\cos \\phi = 3 V_{ph} I_{ph} \\cos \\phi',
        solutions: [
          {
            id: 'sol-uee001-1',
            authorName: 'Dr. M. S. Sodhi',
            authorRoll: 'Faculty / Verified',
            authorBadge: 'Professor Verified',
            verified: true,
            upvotes: 492,
            downvotes: 3,
            postedDate: '02 Oct 2024',
            stepByStep: [
              '1. In Star connection: V_{ph} = V_L / \\sqrt{3} = 415 / 1.732 = 239.6 V.',
              '2. Load impedance magnitude: |Z_L| = \\sqrt{16^2 + 12^2} = \\sqrt{256 + 144} = \\sqrt{400} = 20 \\;\\Omega.',
              '3. Phase current: I_{ph} = V_{ph} / |Z_L| = 239.6 / 20 = 11.98 A.',
              '4. In star connection, Line current I_L = I_{ph} = 11.98 A.',
              '5. Power factor: \\cos \\phi = R / |Z| = 16 / 20 = 0.80 lagging (inductive load j12).',
              '6. Total active power: P = \\sqrt{3} * 415 * 11.98 * 0.8 = 6,889 W ≈ 6.89 kW.'
            ],
            finalAnswer: 'V_{ph} = 239.6 V, I_L = 11.98 A, cos(phi) = 0.80 lagging, Total Power = 6.89 kW.',
            keyFormulas: ['V_{ph} = \\frac{V_L}{\\sqrt{3}}', 'P = \\sqrt{3} V_L I_L \\cos \\phi', '|Z| = \\sqrt{R^2 + X_L^2}'],
            tips: 'Always write "lagging" or "leading" next to the power factor to avoid losing 0.5 marks.'
          }
        ]
      }
    ]
  },
  {
    id: 'pyq-ume408-est-2024',
    courseCode: 'UME408',
    courseTitle: 'Fluid Mechanics & Machinery',
    department: 'MECH',
    semester: 4,
    examType: 'EST',
    year: '2024',
    credits: 4,
    totalMarks: 50,
    timeLimitMins: 180,
    difficulty: 'Hardcore',
    questionsCount: 5,
    hasVerifiedSolution: false,
    views: 1980,
    downloads: 510,
    syllabusModule: 'Navier-Stokes Equations & Boundary Layer Theory',
    questions: [
      {
        qNum: 'Q4',
        marks: 10,
        prompt: 'State the assumptions and derive the von Kármán momentum integral equation for steady 2D laminar boundary layer flow over a flat plate.',
        latexFormula: '\\frac{\\tau_0}{\\rho U^2} = \\frac{d\\theta}{dx} + (2\\theta + \\delta^*) \\frac{1}{U}\\frac{dU}{dx}',
        solutions: []
      }
    ]
  }
];

export const FORMULA_CHEATSHEET: FormulaSnippet[] = [
  {
    id: 'f-big-o',
    title: 'Master Theorem for Divide & Conquer',
    category: 'Algorithms & DS',
    courseCode: 'UCS406',
    latex: 'T(n) = a T\\left(\\frac{n}{b}\\right) + O(n^d) \\implies \\begin{cases} O(n^d) & d > \\log_b a \\\\ O(n^d \\log n) & d = \\log_b a \\\\ O(n^{\\log_b a}) & d < \\log_b a \\end{cases}',
    description: 'Direct recurrence resolution for recursive subproblems in binary search, merge sort, and Strassen matrix multiplication.',
    frequentlyTestedIn: 'UCS406 MST-1 & EST',
    variables: [
      { sym: 'a', desc: 'Number of subproblems (a >= 1)' },
      { sym: 'b', desc: 'Factor by which subproblem size decreases (b > 1)' },
      { sym: 'd', desc: 'Exponent of polynomial work done outside recursive call' }
    ]
  },
  {
    id: 'f-fourier',
    title: 'Continuous Fourier Transform Pair',
    category: 'Signal Processing',
    courseCode: 'UEC404',
    latex: 'X(j\\omega) = \\int_{-\\infty}^{\\infty} x(t) e^{-j\\omega t} dt, \\quad x(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} X(j\\omega) e^{j\\omega t} d\\omega',
    description: 'Fundamental spectral decomposition of continuous-time signals into frequency domain harmonic components.',
    frequentlyTestedIn: 'UEC401 / UEC404 EST',
    variables: [
      { sym: 'X(j\\omega)', desc: 'Continuous Fourier spectrum' },
      { sym: '\\omega', desc: 'Angular frequency in radians/second (2*pi*f)' }
    ]
  },
  {
    id: 'f-carnot',
    title: 'Carnot Heat Engine Maximum Efficiency',
    category: 'Thermodynamics',
    courseCode: 'UES012',
    latex: '\\eta_{\\max} = 1 - \\frac{T_L}{T_H} = \\frac{W_{\\text{net}}}{Q_{\\text{in}}}',
    description: 'Upper theoretical limit on the thermodynamic efficiency of any cyclic heat engine operating between two thermal reservoirs.',
    frequentlyTestedIn: 'UES012 / UME408 MST-2',
    variables: [
      { sym: 'T_H', desc: 'Source reservoir absolute temperature (Kelvin)' },
      { sym: 'T_L', desc: 'Sink reservoir absolute temperature (Kelvin)' }
    ]
  },
  {
    id: 'f-euler-lagrange',
    title: 'Euler-Lagrange Equation',
    category: 'Calculus & Linear Algebra',
    courseCode: 'UMA010',
    latex: '\\frac{\\partial L}{\\partial q} - \\frac{d}{dt}\\left(\\frac{\\partial L}{\\partial \\dot{q}}\\right) = 0',
    description: 'Variational calculus principle yielding equations of motion for stationary action stationary paths.',
    frequentlyTestedIn: 'UMA010 EST Engineering Mathematics',
    variables: [
      { sym: 'L', desc: 'Lagrangian L = T - V (Kinetic - Potential Energy)' },
      { sym: 'q', desc: 'Generalized coordinates' }
    ]
  },
  {
    id: 'f-de-morgan',
    title: 'De Morgan\'s Boolean Theorems',
    category: 'Digital Logic',
    courseCode: 'UCS303',
    latex: '\\overline{A \\cdot B} = \\bar{A} + \\bar{B}, \\quad \\overline{A + B} = \\bar{A} \\cdot \\bar{B}',
    description: 'Core duality equations for CMOS gate minimization and NAND/NOR universal logic transformation.',
    frequentlyTestedIn: 'UCS303 Digital System Design MST-1',
    variables: [
      { sym: 'A, B', desc: 'Binary input logical variables {0, 1}' }
    ]
  }
];
