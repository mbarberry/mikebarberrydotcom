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
    id: 4,
  },
];

export const cardData = [
  {
    color: 'blue.500',
    tech: 'React.js, Next.js, Node.js, AWS CloudFormation, AWS ECS, Docker, Strapi.js',
    pic: '/fluhub.png',
    proj: 'Flu Hub',
    company: 'Digital Infuzion',
    desc: 'Built and deployed a new National Institutes of Health (NIH) public website. Developed 8 pages with React.js / Next.js, full of content stored in Strapi.js, a headless CMS connected to a MySQL database. Some pages feature advanced interactive elements. Deployed to AWS Elastic Container Service based on AWS CloudFormation infrastructure-as-code templates, Dockerfiles, and Bash scripts. Can also be deployed from git triggers such as a tag or a merge. Created all deployment architecture and performed all deployments (while working at Digital Infuzion).',
  },
  {
    color: 'red.500',
    tech: 'Node.js, React.js, HiPlot, AWS S3',
    proj: 'Data Visualization: Parallel Coordinates',
    company: 'Digital Infuzion',
    desc: 'Built a parallel coordinates website based on National Institutes of Health (NIH) data from various files to show the correlations between amount of money received and output. Utilized Node.js to sanitize and combine the data. Created an interactive, informative scatter plot using HiPlot, a Facebook research library, and React.js. Deployed the website to AWS S3.',
    pic: '/parall-coords.png',
  },
  {
    color: 'pink.500',
    tech: 'Python, NLP, Plotly, HTML, JavaScript, AWS S3',
    proj: 'Data Visualization: Scatter Plots',
    pic: '/scatterplots.png',
    company: 'Digital Infuzion',
    desc: 'Performed natural language processing (NLP) on National Institutes of Health (NIH) text using Python to gain insight into relationships in the data. Created multiple versions of scatter plots with Plotly from different combinations of algorithms. Produced a lightweight JavaScript / HTML front-end website and deployed to AWS S3.',
  },
  {
    color: 'teal.500',
    tech: 'Node.js, JavaScript, DOM APIs, Puppeteer, ANDI',
    proj: 'Automated Node.js Tool',
    pic: '/andi.png',
    company: 'Digital Infuzion',
    desc: 'Developed a custom automation tool that saved thousands of dollars in third party software fees. It collects and reports Section 508 alerts. (Federal law requires goverment software to be accessible to people with disabilities.) Built with Node.js, Puppeteer, a code-based version of Chrome, and ANDI, an open source Section 508 library from the Social Security Administration.',
  },

  {
    color: 'yellow.500',
    tech: 'React.js, Next.js, Node.js',
    proj: 'Data Search Page',
    company: 'Digital Infuzion',
    desc: '(Hidden because it is a private portal.) Engineered, from scratch, a new version of a Digital Infuzion (DIFZ) data search page where users can access over a million data records in 30+ categories. Created the entire front-end utilizing React.js / Next.js, MUI, and JavaScript. It features advanced filtering options, where all of the page data updates each time an option changes. Includes a search bar and a sophisticated AG Grid data table.',
    pic: '/ceirr.png',
  },

  {
    color: 'green.500',
    tech: 'React.js, Node.js, Express.js, MongoDB',
    pic: '/connexrx.png',
    company: 'Competitive Solutions',
    desc: 'Created a document upload, and other features, for ConnexRX, a software product built for Coordinated Behavorial Health Solutions (CBHS), a company that manages 30+ behavioral health agencies. The document upload feature allows administrators to upload documents to regular user data, edit / delete them, associate metadata with the upload, and optionally send custom emails to other authorized admin. Front-end is written utilizing React.js and the back-end is in Node.js. MongoDB is the database and the documents themselves are stored in S3.',
    proj: 'ConnexRX',
  },
  {
    color: 'orange.500',
    tech: 'Vue.js, PHP 7, Laravel, MySQL',
    pic: '/net.png',
    company: 'Competitive Solutions',
    desc: 'Led development of Network Engagement Tracker, a software product developed for Ellenville Regional Hospital in New York state to facilitate tracking patient engagement with various community behavioral health services.',
    proj: 'Network Engagement Tracker',
  },
  {
    color: 'purple.500',
    tech: 'React.js, Node.js, Express.js, MySQL',
    pic: '/peerrx.png',
    company: 'Competitive Solutions',
    desc: `Managed development of PeerRX, a software program and website used by emergency room health care providers to find 'peers' (behavorial health counselors) for patients in real time. It utilizes Twilio to send text messages and Node.js to select the best peer fit from the respondents. Front-end is built with React.js.`,
    proj: 'PeerRX',
  },
];
