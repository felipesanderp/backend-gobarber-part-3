import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 20, 11).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 21, 11),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointments on same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 20, 11).getTime();
    });

    await createAppointment.execute({
      date: new Date(2020, 5, 20, 11),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 20, 11),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments on a paste date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 20, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 19, 11),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provicer', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 20, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 19, 11),
        provider_id: 'user_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 20, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 20, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 20, 18),
        provider_id: 'provider_id',
        user_id: 'user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
