/**
 * todo POST /login => restituisce token di accesso, non protetta */
export const PostLogin = async (req, res) => {
};

/**
 * todo GET /me => restituisce l'utente collegato al token di accesso, protetta */
export const GetMe = async (req, res) => {};

/**
 * todo POST - crea un nuovo utente */
export const PostRegister = async (req, res) => {};

// TODO - POST /logout logout utente (per JWT base non serve backend, basta togliere il token dal localStorage)
export const PostLogout = async (req, res) => {};

/**
 * todo GET - login Google */
export const GetLoginGoogle = async (req, res) => {};

/**
 * todo GET - callback Google */
export const GetCallbackGoogle = async (req, res) => {};
