import { sign, verify, Secret, JwtPayload } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'chavesupersecreta123';

  // private static jwtConfig: SignOptions = {
  //   expiresIn: '5d',
  //   algorithm: 'HS256',
  // };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret);
  }

  static verify(token: string): JwtPayload | string {
    return verify(token, this.secret) as JwtPayload;
  }
}
