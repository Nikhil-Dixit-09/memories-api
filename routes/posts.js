const express=require('express');
const router=express.Router();
const postsController=require('../controllers/post_controller')
const auth=require('../middleware/auth');
router.get('/',postsController.forward);
router.post('/create',auth,postsController.create);
router.patch('/update/:id',auth,postsController.update);
router.delete('/delete/:id',auth,postsController.delete);
router.patch('/addlike/:id',auth,postsController.like);
module.exports=router;
