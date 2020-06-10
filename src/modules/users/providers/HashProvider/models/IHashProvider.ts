export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHAsh(payload: string, hashed: string): Promise<boolean>;
}
