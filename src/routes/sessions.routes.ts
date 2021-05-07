import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// make password optional
interface UserResponse {
  user: {
    password?: string;
  };
  token: string;
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const autenticateUser = new AuthenticateUserService();

    const { user, token }: UserResponse = await autenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({
      user,
      token,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
