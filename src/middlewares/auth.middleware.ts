import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.authorization !== 'rahasia') {
    const err: any = new Error("Unauthorized");
    err.status = 401; return next(err);
  }
  
  next();
};