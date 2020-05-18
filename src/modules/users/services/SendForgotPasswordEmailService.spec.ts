import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokensRpository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeMailProvider
    );
  });

  it('should be able to recover password using his email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John DOe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await sendForgotEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not to be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotEmail.execute({
        email: 'johndoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John DOe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await sendForgotEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
