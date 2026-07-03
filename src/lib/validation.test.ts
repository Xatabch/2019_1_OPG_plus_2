import { describe, expect, it } from 'vitest';
import { validEmail, validLogin, validPassword } from './validation';

describe('validation', () => {
  describe('validEmail', () => {
    it('accepts valid emails', () => {
      expect(validEmail('user@example.com')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validEmail('not-an-email')).toBe(false);
    });
  });

  describe('validLogin', () => {
    it('accepts valid usernames', () => {
      expect(validLogin('player_1')).toBe(true);
    });

    it('rejects empty or too long names', () => {
      expect(validLogin('')).toBe(false);
      expect(validLogin('a'.repeat(15))).toBe(false);
    });
  });

  describe('validPassword', () => {
    it('requires more than 5 characters', () => {
      expect(validPassword('123456')).toBe(true);
      expect(validPassword('12345')).toBe(false);
    });
  });
});
