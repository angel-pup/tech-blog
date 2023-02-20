const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', (req, res) => {
  Comment.create(req.body)
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(400).json({ message: err.message }));
});

// NOTE: This is for fetching comments based on a blog's ID, not comment ID, since
// we only need to fetch comments per blog post. This saves on code and forgoes
// a BlogComments sequelize model from being needed to map comments to blogs.
// TODO: In the event that this is needed for fetching specific comments, and for
// cleaner, future-proof code, all code fetching from here will need to be refactored
// to point to a get by id route for a BlogComments sequelize model instead.
router.get('/:id', (req, res) => {
  Comment.findAll({ where: {blog_id: req.params.id}})
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ message: 'comment not found'});
      }
      res.status(200).json(comment);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});

// TODO: Possibly need the following code in the event udpating/deleting comments is needed
// router.put('/:id', (req, res) => {
//   Comment.update({message}, { where: { id: req.params.id } })
//     .then(updated => {
//       if (!updated[0]) {
//         return res.status(404).json({ message: 'comment not found' });
//       }
//       res.status(200).json({ message: 'comment updated' });
//     })
//     .catch(err => res.status(400).json({ message: err.message }));
// });

// router.delete('/:id', (req, res) => {
//   Comment.destroy({ where: { id: req.params.id } })
//     .then(deleted => {
//       if (!deleted) {
//         return res.status(404).json({ message: 'comment not found'});
//       }
//       res.status(200).json({ message: 'comment deleted' });
//     })
//     .catch(err => res.status(400).json({ message: err.message }));
// });

module.exports = router;