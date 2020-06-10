import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptHAshProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHAsh(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHAshProvider;
