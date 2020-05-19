import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;

let showProfile: ShowProfileService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@gmail.com');
  });

  it('should not to be able to show profile of non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
