const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // makes sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoriesData) {
      res.status(200).json({ message: "Did not find any Categories!" });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // makes sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryId) {
      res.status(200).json({ message: "Did not find any Categories!" });
      return;
    }

    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // creates a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.categoryName,
    });

    res.status(200).json(newCategory);
    console.log("Success! New Category added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // updates a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.categoryName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // checks if the Category ID exists. If not - message pops up:
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryId) {
      res
        .status(200)
        .json({ message: "Did not find any Categories with this ID!" });
      return;
    }

    res.status(200).json(updatedCategory);
    console.log("Success! Category was updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // deletes a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // checks if the Category ID exists. If not - message pops up:
    if (!deleteCategory) {
      res
        .status(200)
        .json({ message: "Did not find any Categories with this ID!" });
      return;
    }

    res.status(200).json(deleteCategory);
    console.log("Success! Category was deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
