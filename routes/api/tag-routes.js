const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finds all tags
  // includes its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(200).json({message: 'Did not find any Tags!'});
      return;
    }

    res.json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // finds a single tag by its `id`
  // includes its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagId) {
      res.status(200).json({message: 'Did not find any Tags!'});
      return;
    };

    res.status(200).json(tagId);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tagName
    });

    res.status(200).json(newTag);
    console.log('Success! New Tag was created!');

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tagName
    },
    {
      where: {
        id: req.params.id
      }
    });
    
     // checks if the Tag ID exists. If not - message pops up:
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagId) {
      res.status(200).json({message: 'Did not find any Tags!'});
      return;
    };

    res.status(200).json(updateTag);
    console.log('Success! Tag was updated!');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(200).json({message: 'Did not find any Tags!'});
      return;
    }

    res.status(200).json(deleteTag);
    console.log('Success! Tag was deleted!');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
