import jsw from 'jsonwebtoken';
export default function checkToken(req, res, next) {
    jsw.verify(req.body.token);
}
