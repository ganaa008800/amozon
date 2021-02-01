const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categories");
// controller дотороос importлож байна.
const router = express.Router();
router.route("/").get(getCategories).post(createCategory);
//энэ root-ээр орж ирээд мессеж нь get  байх юм бол
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;
