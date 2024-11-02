/*
  {
    color: '#CACACA',
    route: '/portal',
    text: 'Client Portal',
    id: 4,
  }
*/

export const headerData = [
  {
    color: '#E7E2CA',
    route: '/',
    text: 'Home',
    id: 0,
  },
  {
    color: '#CADEE7',
    route: '/about',
    text: 'About',
    id: 1,
  },
  {
    color: '#CAE7D4',
    route: '/resume',
    text: 'Resume',
    id: 2,
  },
  {
    color: '#E7D4CA',
    route: '/blog',
    text: 'Blog',
    id: 3,
  },
  {
    color: '#E7CADE',
    route: '/contact',
    text: 'Contact',
    id: 5,
  },
];

export const cardData = [
  {
    color: 'blue.500',
    tech: 'React.js, Next.js, MUI, JavaScript/HTML, Node.js, Strapi.js, AWS, Docker',
    pic: '/fluhub.png',
    proj: 'Flu Hub',
    company: 'Digital Infuzion',
    desc: 'Built a new full-stack National Institutes of Health public website.',
  },
  {
    color: 'red.500',
    tech: 'Node.js, React.js, HiPlot, AWS',
    proj: 'Parallel Coordinates Data Visualization',
    company: 'Digital Infuzion',
    desc: 'Received 3 raw CSV files of NIH data and created an interactive parallel coordinates chart from the processed data. Deployed to AWS S3.',
    pic: '/parall-coords.png',
  },
  {
    color: 'pink.500',
    tech: 'Python, Scikit-Learn, Pandas, NumPy, JS/HTML, AWS',
    proj: 'Natural Language Processing and Data Visualization',
    pic: '/scatterplots.png',
    company: 'Digital Infuzion',
    desc: 'Received an Excel file of NIH data, performed natural language processing (vectorization, reduction) with Python and generated HTML plots. Deployed to AWS S3.',
  },
  {
    color: 'teal.500',
    tech: 'Node.js, JavaScript, HTML/CSS, Puppeteer, ANDI',
    proj: 'Automated Compliance Tool',
    pic: '/andi.png',
    company: 'Digital Infuzion',
    desc: `Background: Digital Infuzion is contractually obligated to produce compliance reports for their software. Created a program to automate collecting information pertinent to compliance and produce a PDF report. They no longer needed to pay a subscription fee to a different company.`,
  },

  {
    color: 'yellow.500',
    tech: 'React.js, Next.js, MUI, Node.js, OpenSearch, AWS',
    proj: 'Data Search Page',
    company: 'Digital Infuzion',
    desc: 'Note: Digital Infuzion requested I obscure this photo. Built a very complicated private data search portal page that queries OpenSearch for over a million records in 30+ project categories. Each time a user changes a filter, all of the page data is updated.',
    pic: '/ceirr.png',
  },

  {
    color: 'green.500',
    tech: 'React.js, Node.js, Express.js, MongoDB',
    pic: '/connexrx.png',
    company: 'Competitive Solutions',
    desc: 'Led development and created many features, including document upload.',
    proj: 'ConnexRX',
  },
  {
    color: 'orange.500',
    tech: 'Vue.js, PHP 7, Laravel, MySQL',
    pic: '/net.png',
    company: 'Competitive Solutions',
    desc: 'Led development of Network Engagement Tracker: managed engineers and met with stakeholders.',
    proj: 'Network Engagement Tracker',
  },
  {
    color: 'purple.500',
    tech: 'React.js, Node.js, Express.js, MySQL',
    pic: '/peerrx.png',
    company: 'Competitive Solutions',
    desc: `Managed developed project: created wireframes, mockups, timelines, coordinated with stakeholders and engineers.`,
    proj: 'PeerRX',
  },
];
