// routes/index.js
// this file has all the routes for my portfolio site
// a route is basically: when someone goes to this URL, show them this page

// bringing in express so I can use its router
var express = require('express');

// making a router, this is what holds all my routes
var router = express.Router();

// this is the list of my projects
// it's an array of objects, each object is one project card on the Projects page
// I put it here instead of typing it in the HTML so the page can just loop through it
var projects = [
  {
    title: 'TSHOOT Lab Network Documentation', // name of the project
    icon: 'fa-network-wired',                  // the Font Awesome icon that shows on the card
    tags: ['Cisco', 'Routing', 'Documentation'], // little labels at the bottom of the card
    description: 'Semester long documentation of the TSHOOT lab network: topology diagrams, IP addressing, device configs and troubleshooting notes.' // short info about it
  },
  {
    title: 'NMS Recommendation for ITA',
    icon: 'fa-chart-line',
    tags: ['Network Monitoring', 'SNMP', 'Group Project'],
    description: 'Compared network management systems and recommended one for a fictional organization, presented as a recorded video for Advanced Networking III.'
  },
  {
    title: 'Yoshin the Robot Cat',
    icon: 'fa-robot',
    tags: ['HRI', 'Service Robots', 'Team of 5'],
    description: 'Human robot interaction project building a companion robot cat, from proposal to final live demo.'
  },
  {
    title: 'Small Business IT Buildout',
    icon: 'fa-server',
    tags: ['MFA', 'Backups', 'M365'],
    description: 'Built IT from scratch for a construction company: staff laptops, email accounts, MFA, backups and documentation.'
  },
  {
    title: 'CrystalClear Window Cleaning',
    icon: 'fa-briefcase',
    tags: ['Business', 'Operations'],
    description: 'Started a Durham Region window cleaning service using a monthly membership model for commercial storefronts.'
  },
  {
    title: 'Express Portfolio (this site)',
    icon: 'fa-code',
    tags: ['Node.js', 'Express', 'EJS', 'Bootstrap'],
    description: 'This site. Built with the Express Generator, EJS layouts and partials, Bootstrap 5 and Font Awesome, deployed on Render.'
  }
];

// HOME PAGE
// when someone goes to "/" (the main link of my site) this runs
// res.render shows the index.ejs file from my views folder
// title is what shows in the browser tab
// page tells my navbar which link to make blue
// featured is the first 3 projects so the home page can show a preview
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', page: 'home', featured: projects.slice(0, 3) });
});

// I also made "/home" go to the same home page
// just in case someone types /home instead of the main link
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Home', page: 'home', featured: projects.slice(0, 3) });
});


// ABOUT ME PAGE
// when someone goes to "/about" it shows my about.ejs page
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Me', page: 'about' });
});

// PROJECTS PAGE
// when someone goes to "/projects" it shows projects.ejs
// I also send my projects array so the page can make a card for each one
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects', page: 'projects', projects: projects });
});

// CONTACT ME PAGE
// when someone goes to "/contact" it shows contact.ejs
// sent is false because they haven't sent anything yet, so no thank you message
// name is empty for the same reason
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Me', page: 'contact', sent: false, name: '' });
});

// CONTACT FORM SUBMIT
// this one is router.post, not get, because the form sends data to the server
// it runs when someone fills out my contact form and hits Send
router.post('/contact', function (req, res, next) {
  // req.body has everything they typed in the form
  // I grab their name and .trim() removes any extra spaces
  // the || '' part means if there's no name just use an empty string so it doesn't crash
  var name = (req.body.name || '').trim();

  // printing what they sent in the terminal so I can see it worked
  console.log('Contact form submitted:', req.body);

  // showing the contact page again but now sent is true
  // so the green thank you message shows up with their name
  res.render('contact', { title: 'Contact Me', page: 'contact', sent: true, name: name });
});

// exporting the router so app.js can use it
// in app.js I have app.use('/', indexRouter) which connects all of this
module.exports = router;