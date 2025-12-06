const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, util) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }//utilisateur(..)
    req.utilisateur = util; 
    //console.log(req.utilisateur);
    
    // On met les information de l'utilisateur dans sa requette, A chaque fois qu'il vas faire une requette on saura que c'est lui. 
    //console.log(req.utilisateur);//A cha que foi q'un utilisateur fera une requete on s'aura que c'est lui
    next();      
  });  
};

module.exports = verifierToken;
