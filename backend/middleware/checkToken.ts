import jsw from 'jsonwebtoken'
import { Request, Response, Next } from 'express'

export default function checkToken(req: Request, res: Response, next: Next) {
    jsw.verify(req.body.token)
}