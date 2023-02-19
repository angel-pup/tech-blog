const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
// TODO: rewrite home route rendering
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{
        model: User,
        required: true,
        attributes: {
          exclude: [ "password" ]
        }
      }],
      order: [['date_created', 'DESC']]
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    console.log(blogs);

    res.render('homepage', {
      blogs,
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

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;