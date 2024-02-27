import { Router } from 'express';
import { AdminController } from '../controllers/Admin.controller';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.route('/addGroceryItem').post(adminController.addGroceryItem.bind(adminController));
adminRouter.route('/viewGroceryItems').get(adminController.viewGroceryItems.bind(adminController));
adminRouter.route('/removeGroceryItem').post(adminController.removeGroceryItem.bind(adminController));
adminRouter.route('/updateGroceryItem').post(adminController.updateGroceryItem.bind(adminController));
adminRouter.route('/manageInventory').post(adminController.manageInventory.bind(adminController));
adminRouter.route('/getOrders').get(adminController.getOrders.bind(adminController));


export default adminRouter;