import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticate);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
