import jwt from 'jsonwebtoken';

const verifyToken = ({ authorization, onSuccess, onError }) => {
  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, 'mecontratabackend');
    onSuccess(id);
  } catch (e) {
    onError();
  }
};

const ensureAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  return verifyToken({
    authorization,
    onSuccess: (id) => {
      req.userId = id;
      return next();
    },
    onError: () => res.status(401).json({ error: 'Token inválido' }),
  });
};

export default ensureAuth;
export { verifyToken };
