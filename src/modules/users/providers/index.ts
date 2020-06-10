import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHAshProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHAshProvider);
