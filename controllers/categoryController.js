const {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/categoryService");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../middlewares/validator");

exports.createCategory = async (req, res) => {
  const { userId } = req.user;

  try {
    const { error } = createCategorySchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const category = await createCategoryService(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  const { userId } = req.user;

  try {
    const categories = await getCategoriesService(userId);
    res.json({
      success: true,
      categories,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.patchCategory = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const { error } = updateCategorySchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const category = await updateCategoryService(userId, id, req.body);
    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    await deleteCategoryService(userId, id);
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
