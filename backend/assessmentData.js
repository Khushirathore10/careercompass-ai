const questions = [
  { id: 1, category: 'logical', question: 'If all roses are flowers and some flowers fade quickly, which statement is definitely true?', options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'Flowers always fade quickly'], correct: 1, points: 20 },
  { id: 2, category: 'logical', question: 'A sequence: 2, 6, 12, 20, 30, ___. What comes next?', options: ['42', '40', '44', '36'], correct: 0, points: 20 },
  { id: 3, category: 'logical', question: 'If LAMP is coded as NCOQ, how is BOOK coded?', options: ['DQQM', 'CQQM', 'DQQN', 'DPPM'], correct: 0, points: 20 },
  { id: 4, category: 'logical', question: 'John is taller than Mary. Mary is taller than Sue. Sue is taller than Tom. Who is the shortest?', options: ['John', 'Mary', 'Sue', 'Tom'], correct: 3, points: 20 },
  { id: 5, category: 'logical', question: 'What fraction of a day is 6 hours?', options: ['1/6', '1/4', '1/3', '1/8'], correct: 1, points: 20 },
  { id: 6, category: 'technical', question: 'Which sorting algorithm has the best average time complexity?', options: ['Bubble Sort O(n²)', 'Quick Sort O(n log n)', 'Selection Sort O(n²)', 'Insertion Sort O(n²)'], correct: 1, points: 20 },
  { id: 7, category: 'technical', question: 'What does API stand for in software development?', options: ['Application Process Integration', 'Automated Program Interface', 'Application Programming Interface', 'Advanced Protocol Integration'], correct: 2, points: 20 },
  { id: 8, category: 'technical', question: 'Which of the following is NOT a programming language?', options: ['Python', 'Java', 'Linux', 'Ruby'], correct: 2, points: 20 },
  { id: 9, category: 'technical', question: 'How much do you enjoy solving programming challenges in your free time?', options: ['Not at all', 'Occasionally', 'Often', 'It\'s my passion!'], correct: 3, points: 20 }
];

module.exports = { questions };
