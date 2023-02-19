const router = require('express').Router();
const { Note } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
// TODO: rewrite home route rendering
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await Note.findAll({
      order: [['date_created', 'DESC']],
    });

    const notes = userData.map((note) => note.get({ plain: true }));

    res.render('homepage', {
      notes,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;