import Jwt from "jsonwebtoken";
import usersSchema from "../models/users.schema.js";

// todo convertire i return in thor new Error
export const Authorization = (req, res, next) => {
  // verifico che nell'headers sia presente l'authorization di tipo Bearer altrimenti chiudo la funzione
  if (!req.headers.authorization) return res.status(401).send();
  // splitto l'authorization in 2
  const AuthorizationParts = req.headers.authorization.split(" ");
  // se le parti non sono 2 chiudo la funzione
  if (AuthorizationParts.length !== 2) return res.status(401).send();
  // se la prima parte non è Bearer chiudo la funzione
  if (AuthorizationParts[0] !== "Bearer") return res.status(401).send();
  // prelevo il token
  const JwtToken = AuthorizationParts[1];
  // verifico la firma del token passandogli il token, il segreto ed avremo la callback
  Jwt.verify(JwtToken, process.env.JWT_SECRET, async (err, payload) => {
    // se la callback restituisce errore chiudo la funzione
    if (err) return res.status(401).send();
    // recupero i dati dell'utente dal database. il campo password non dovrebbe essere restituito in quanto nello schema abbiamo escluso il suo recupero
    const User = await usersSchema.findById(payload.user);
    // se l'utente non è presente nel database chiudo la funzione
    if (!User) return res.status(401).send();
    // aggiungo i dati alla richiesta in modo tale da renderli disponibili ai middleware successivi evitando di fetcharli
    req.LoggedUser = User;
    // se tutto è andato a buon fine passo al middleware successivo
    next();
  });
};
