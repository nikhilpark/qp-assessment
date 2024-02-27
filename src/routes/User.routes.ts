import { Router } from 'express';
import { UserController } from '../controllers/User.controller';

const userRouter = Router();
const adminController = new UserController();

userRouter.route('/placeAnOrder').post(adminController.placeAnOrder.bind(adminController));
userRouter.route('/getGroceryItems').get(adminController.getGroceryItems.bind(adminController));



export default userRouter;