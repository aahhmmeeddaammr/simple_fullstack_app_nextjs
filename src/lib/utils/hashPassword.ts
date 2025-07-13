import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

export const hashPassword = async (password: string) => {
  try {
    const hash = (await scryptAsync(password.normalize(), "", 16)) as Buffer;
    return { status: true, hash: hash.toString("hex").normalize() };
  } catch {
    return { status: false };
  }
};