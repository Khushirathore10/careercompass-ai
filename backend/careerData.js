const careers = {
  'backend-developer': {
    id: 'backend-developer',
    title: 'Backend Developer',
    icon: '⚙️',
    description: 'Build server-side logic, APIs, and databases that power applications.',
    category: 'Technology',
    tags: ['coding', 'problem-solving', 'technical'],
    salary: {
      entry: { min: 400000, max: 600000, label: '₹4–6 LPA' },
      mid: { min: 800000, max: 1500000, label: '₹8–15 LPA' },
      senior: { min: 2000000, max: 4000000, label: '₹20–40 LPA' },
      growth: [4, 6, 8, 12, 18, 25, 35]
    },
    requiredSkills: ['JavaScript', 'Node.js', 'Python', 'SQL', 'REST APIs', 'Git', 'Docker', 'System Design'],
    roadmap: [
      { title: 'Programming Fundamentals', desc: 'Master a language (Python/JS/Java)', duration: '2 months' },
      { title: 'Data Structures & Algorithms', desc: 'Arrays, trees, graphs, sorting algorithms', duration: '2 months' },
      { title: 'Databases & SQL', desc: 'MySQL/PostgreSQL, schema design, indexing', duration: '1 month' },
      { title: 'Backend Frameworks', desc: 'Node.js + Express / Django / Spring Boot', duration: '2 months' },
      { title: 'APIs & System Design', desc: 'REST, GraphQL, microservices basics', duration: '1 month' },
      { title: 'Build Projects', desc: 'E-commerce API, blog backend, auth system', duration: '2 months' },
      { title: 'Internship & Placement Prep', desc: 'LeetCode, mock interviews, resume building', duration: '2 months' }
    ],
    courses: [
      { name: 'The Complete Node.js Developer Course', platform: 'Udemy', url: 'https://www.udemy.com', free: false },
      { name: 'CS50: Introduction to Computer Science', platform: 'edX', url: 'https://www.edx.org', free: true },
      { name: 'Back End Development and APIs', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org', free: true },
      { name: 'META Backend Developer Certificate', platform: 'Coursera', url: 'https://www.coursera.org', free: false }
    ]
  },
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: '📊',
    description: 'Extract insights from data using statistics, ML, and programming.',
    category: 'Data & AI',
    tags: ['data', 'math', 'programming', 'analytical'],
    salary: {
      entry: { min: 500000, max: 800000, label: '₹5–8 LPA' },
      mid: { min: 1200000, max: 2000000, label: '₹12–20 LPA' },
      senior: { min: 2500000, max: 5000000, label: '₹25–50 LPA' },
      growth: [6, 9, 13, 18, 24, 35, 45]
    },
    requiredSkills: ['Python', 'R', 'Statistics', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas', 'Data Visualization'],
    roadmap: [
      { title: 'Python & Math Foundations', desc: 'Python, linear algebra, statistics, probability', duration: '2 months' },
      { title: 'Data Wrangling', desc: 'Pandas, NumPy, data cleaning, EDA', duration: '1.5 months' },
      { title: 'Machine Learning Core', desc: 'Scikit-learn, regression, classification, clustering', duration: '2 months' },
      { title: 'Deep Learning', desc: 'Neural networks, TensorFlow, PyTorch basics', duration: '2 months' },
      { title: 'Data Visualization', desc: 'Matplotlib, Seaborn, Customer Visualization', duration: '1 month' },
      { title: 'Kaggle & Projects', desc: 'Competitions, end-to-end ML projects', duration: '2 months' },
      { title: 'Portfolio & Job Prep', desc: 'GitHub portfolio, interview prep', duration: '1.5 months' }
    ],
    courses: [
      { name: 'Machine Learning by Andrew Ng', platform: 'Coursera', url: 'https://www.coursera.org', free: false },
      { name: 'Data Science with Python', platform: 'DataCamp', url: 'https://www.datacamp.com', free: false },
      { name: 'Kaggle Learn', platform: 'Kaggle', url: 'https://www.kaggle.com/learn', free: true },
      { name: 'Fast.ai Deep Learning', platform: 'fast.ai', url: 'https://www.fast.ai', free: true }
    ]
  },
  'cloud-engineer': {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    icon: '☁️',
    description: 'Design and manage cloud infrastructure, deployments, and DevOps pipelines.',
    category: 'Technology',
    tags: ['cloud', 'devops', 'technical', 'infrastructure'],
    salary: {
      entry: { min: 500000, max: 800000, label: '₹5–8 LPA' },
      mid: { min: 1000000, max: 1800000, label: '₹10–18 LPA' },
      senior: { min: 2200000, max: 4500000, label: '₹22–45 LPA' },
      growth: [6, 8, 12, 16, 22, 32, 42]
    },
    requiredSkills: ['AWS/Azure/GCP', 'Linux', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Networking', 'Python'],
    roadmap: [
      { title: 'Linux & Networking Basics', desc: 'Shell scripting, TCP/IP, DNS, networking fundamentals', duration: '1.5 months' },
      { title: 'Cloud Fundamentals', desc: 'AWS/Azure/GCP core services, pricing, IAM', duration: '2 months' },
      { title: 'Containers & Orchestration', desc: 'Docker, Kubernetes, container management', duration: '2 months' },
      { title: 'Infrastructure as Code', desc: 'Terraform, CloudFormation, Ansible', duration: '1.5 months' },
      { title: 'CI/CD Pipelines', desc: 'Jenkins, GitHub Actions, GitLab CI', duration: '1 month' },
      { title: 'Certifications', desc: 'AWS Solutions Architect / Azure Fundamentals', duration: '2 months' },
      { title: 'Projects & Portfolio', desc: 'Deploy real apps, contribute to open source', duration: '2 months' }
    ],
    courses: [
      { name: 'AWS Certified Solutions Architect', platform: 'A Cloud Guru', url: 'https://acloudguru.com', free: false },
      { name: 'Google Cloud Fundamentals', platform: 'Coursera', url: 'https://www.coursera.org', free: false },
      { name: 'Docker & Kubernetes: The Complete Guide', platform: 'Udemy', url: 'https://www.udemy.com', free: false },
      { name: 'Linux Foundation Free Courses', platform: 'Linux Foundation', url: 'https://training.linuxfoundation.org', free: true }
    ]
  },
  'ui-ux-designer': {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    icon: '🎨',
    description: 'Craft beautiful, intuitive user interfaces and experiences.',
    category: 'Design',
    tags: ['design', 'creativity', 'visual', 'user-research'],
    salary: {
      entry: { min: 300000, max: 500000, label: '₹3–5 LPA' },
      mid: { min: 700000, max: 1200000, label: '₹7–12 LPA' },
      senior: { min: 1500000, max: 3000000, label: '₹15–30 LPA' },
      growth: [4, 6, 9, 12, 18, 25, 30]
    },
    requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'HTML/CSS', 'Typography', 'Color Theory'],
    roadmap: [
      { title: 'Design Fundamentals', desc: 'Color theory, typography, layout, visual hierarchy', duration: '1 month' },
      { title: 'UX Research & Strategy', desc: 'User personas, journey mapping, usability testing', duration: '1.5 months' },
      { title: 'Wireframing & Prototyping', desc: 'Low/high fidelity wireframes, interactive prototypes', duration: '1.5 months' },
      { title: 'Master Design Tools', desc: 'Figma, Adobe XD, Sketch', duration: '2 months' },
      { title: 'HTML/CSS for Designers', desc: 'Basic frontend knowledge for handoff', duration: '1 month' },
      { title: 'Portfolio Building', desc: '3–5 strong case studies, Behance/Dribbble', duration: '2 months' },
      { title: 'Freelancing / Placement', desc: 'Apply to agencies, startups, and freelance platforms', duration: '1 month' }
    ],
    courses: [
      { name: 'Google UX Design Certificate', platform: 'Coursera', url: 'https://www.coursera.org', free: false },
      { name: 'UI Design Fundamentals', platform: 'Scrimba', url: 'https://scrimba.com', free: true },
      { name: 'Figma for Beginners', platform: 'YouTube', url: 'https://www.youtube.com', free: true },
      { name: 'Interaction Design Foundation', platform: 'IDF', url: 'https://www.interaction-design.org', free: false }
    ]
  },
  'product-manager': {
    id: 'product-manager',
    title: 'Product Manager',
    icon: '📱',
    description: 'Lead product vision, strategy, and cross-functional teams to build great products.',
    category: 'Management',
    tags: ['leadership', 'communication', 'analytical', 'strategy'],
    salary: {
      entry: { min: 600000, max: 1000000, label: '₹6–10 LPA' },
      mid: { min: 1500000, max: 2500000, label: '₹15–25 LPA' },
      senior: { min: 3000000, max: 6000000, label: '₹30–60 LPA' },
      growth: [8, 12, 18, 24, 32, 42, 55]
    },
    requiredSkills: ['Product Strategy', 'Agile/Scrum', 'Data Analysis', 'User Research', 'Roadmapping', 'SQL', 'Communication', 'Stakeholder Management'],
    roadmap: [
      { title: 'Business & Product Basics', desc: 'Business models, market research, competitive analysis', duration: '1 month' },
      { title: 'Agile & Project Management', desc: 'Scrum, sprint planning, Jira, Confluence', duration: '1.5 months' },
      { title: 'UX & Customer Research', desc: 'User interviews, surveys, journey mapping', duration: '1 month' },
      { title: 'Data & Analytics', desc: 'SQL basics, Google Analytics, product metrics', duration: '2 months' },
      { title: 'Roadmapping & Prioritization', desc: 'OKRs, RICE scoring, PRDs', duration: '1 month' },
      { title: 'Build & Own a Product', desc: 'Personal project or open source product contribution', duration: '2 months' },
      { title: 'Interview Prep', desc: 'PM case interviews, behavioral questions, portfolio', duration: '1.5 months' }
    ],
    courses: [
      { name: 'Product Management Fundamentals', platform: 'Coursera', url: 'https://www.coursera.org', free: false },
      { name: 'Reforge PM Program', platform: 'Reforge', url: 'https://www.reforge.com', free: false },
      { name: 'PM Interview Prep', platform: 'YouTube', url: 'https://www.youtube.com', free: true },
      { name: 'Pragmatic Institute', platform: 'Pragmatic', url: 'https://www.pragmaticinstitute.com', free: false }
    ]
  }
};

function recommendCareers(profile, assessment) {
  const { skills = [], interests = [] } = profile;
  const { logical_score = 0, technical_score = 0, creativity_score = 0, communication_score = 0 } = assessment || {};

  const allSkills = [...skills, ...interests].map(s => s.toLowerCase());
  const scores = {};

  Object.values(careers).forEach(career => {
    let score = 0;
    career.tags.forEach(tag => {
      if (allSkills.some(s => s.includes(tag) || tag.includes(s))) score += 15;
    });
    if (career.tags.includes('technical') || career.tags.includes('coding')) score += technical_score * 0.8;
    if (career.tags.includes('analytical') || career.tags.includes('data')) score += logical_score * 0.8;
    if (career.tags.includes('creativity') || career.tags.includes('design')) score += creativity_score * 0.8;
    if (career.tags.includes('communication') || career.tags.includes('leadership')) score += communication_score * 0.8;
    scores[career.id] = score;
  });

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, matchScore]) => ({ ...careers[id], matchScore: Math.min(Math.round(matchScore), 98) }));
}

module.exports = { careers, recommendCareers };
