const router = require("express").Router();
const userController = require("../controller/users");

/**__________________________
 * get user by id or email
 * @method get
 */
router.get("/:userId", userController.getUserById);

/**__________________________
 * update user by id
 * @method put
 */
router.put("/:userId", userController.putUserById);

/**______________________________
 * update user by id
 * @method patch
 */
router.patch("/:userId", userController.patchUserById);

/**_______________________________
 * delete user by id
 * @method delete
 */
router.delete("/:userId", userController.deleteUserById);

/**___________________________________
 * get all users, include
 * - filter
 * pagination
 * select properties
 * @route /api/users?sort=["by","name"]
 * @method get
 * @visibility Private
 */
router.get("/", userController.getUsers);

/***______________________
 * create a new user
 */
router.post("/", userController.postUser);

module.exports = router;
