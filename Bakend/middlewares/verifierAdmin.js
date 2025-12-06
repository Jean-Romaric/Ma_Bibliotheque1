const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // la même utilisée pour créer le token

const verifierAdmin = (req, res, next) => {
  // Récupération du token dans l'en-tête Authorizatinon
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    if (decoded.role !== 'admin') { //role
      return res.status(403).json({ message: 'Accès refusé : auccun droit ' });
    }
    req.util = decoded; // Pour utilisation future si nécessaire
    //console.log(decoded);
    next();
  } catch (err) {
    console.error('Erreur de vérification du token :', err);
    return res.status(401).json({ message: 'Token invalide' });
  }
};
module.exports = verifierAdmin;
