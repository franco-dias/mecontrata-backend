import jwt from 'jsonwebtoken';

const ensureAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, 'mecontratabackend');
    req.userId = id;
    console.log('user-id ------->', id);
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export default ensureAuth;
