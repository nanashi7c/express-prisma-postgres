import type { NextFunction, Response } from "express";
import type { Request } from "./types.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { getToken } from "./auth.js";

export function authenticate(excludePaths: string[] = []) {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (excludePaths.includes(req.path)) {
      next();
      return;
    }
    try {
      const token = getToken(req);

      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // FIXME: 本番運用では、必ず環境変数など外部から秘密鍵を読み込むようにしてください。
      const secret = "your_secret_key";

      const decoded = jwt.verify(token, secret) as JwtPayload;

      req.user = {
        id: decoded.id,
        name: decoded.name,
      };

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
