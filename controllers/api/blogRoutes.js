const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', (req, res) => {
  Blog.create(req.body)
    .then(blog => res.status(200).json(blog))
    .catch(err => res.status(400).json({ message: err.message }))
});

router.get('/:id', (req, res) => {
  Blog.findByPk(req.params.id)
    .then(blogpost => {
      if (!blogpost) {
        return res.status(404).json({ message: 'Blogpost not found'});
      }
      res.status(200).json(blogpost);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

router.put('/:id', (req, res) => {
  Blog.update(req.body, { where: { id: req.params.id } })
    .then(updated => {
      if (!updated[0]) {
        return res.status(404).json({ message: 'Blogpost not found' });
      }
      res.status(200).json({ message: 'Blogpost updated' });
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

router.delete('/:id', (req, res) => {
  Blog.destroy({ where: { id: req.params.id } })
    .then(deleted => {
      if (!deleted) {
        return res.status(404).json({ message: 'Blogpost not found'});
      }
      res.status(200).json({ message: 'Blogpost deleted' });
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

module.exports = router;