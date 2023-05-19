const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', (req, res) => {
  Comment.create(req.body)
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(400).json({ message: err.message }));
});

// router.get('/:blog_id', (req, res) => {
//   Comment.findAll ({ where: { blog_id: req.params.blog_id } })
//     .then(comment => {
//       if (!comment) {
//         return res.status(404).json({ message: 'Comment not found' });
//       }
//       res.status(200).json(comment);
//     })
//     .catch(err => res.status(400).json({ message: err.message }));
// });


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