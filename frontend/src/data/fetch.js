// dichiaro i vari url per le chiamate al server
const FetchAuthenticationUrl = `${process.env.REACT_APP_API_URL}/api/v1/auth`;
const FetchUserUrl = `${process.env.REACT_APP_API_URL}/api/v1/user`;
const FetchCategoriesUrl = `${process.env.REACT_APP_API_URL}/api/v1/category`;
const FetchPaymentMethodsUrl = `${process.env.REACT_APP_API_URL}/api/v1/paymentMethod`;
const FetchTransactionsUrl = `${process.env.REACT_APP_API_URL}/api/v1/transactions`;

// todo AUTHENTICATION
// POST /login => restituisce token di accesso, non protetta
export const PostLogin = async (FormValues) => {
  console.log("DATA => Fetch => PostLogin");
  try {
    const res = await fetch(`${FetchAuthenticationUrl}/login`, {
      method: "POST",
      body: JSON.stringify(FormValues),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// GET /me => restituisce l'utente collegato al token di accesso, protetta
export const GetMeInfo = async () => {
  console.log("DATA => Fetch => GetMeInfo");
  try {
    const res = await fetch(`${FetchAuthenticationUrl}/me`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// POST /register => crea un nuovo utente
export const PostRegister = async (FormValues) => {
  console.log("DATA => Fetch => PostRegister");
  try {
    const res = await fetch(`${FetchAuthenticationUrl}/register`, {
      method: "POST",
      body: JSON.stringify(FormValues),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// POST /logout => logout utente (per JWT base non serve backend, basta togliere il token dal localStorage)
// ??? conviene fare la funzione di logout che semplicemente pulisce il localStorage dal token?

// todo USER
// GET /:UserId => recupera l'utente
export const GetUser = async (UserId) => {
  console.log("DATA => Fetch => GetUser");
  try {
    const res = await fetch(`${FetchUserUrl}/${UserId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// PUT /:UserId => modifica l'utente
export const PutUser = async (UserId, FormValues) => {
  console.log("DATA => Fetch => PutUser");
  try {
    const res = await fetch(`${FetchUserUrl}/${UserId}`, {
      method: "PUT",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE /:UserId => elimina l'utente
export const DeleteUser = async (UserId) => {
  console.log("DATA => Fetch => DeleteUser");
  try {
    const res = await fetch(`${FetchUserUrl}/${UserId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// PATCH /:UserId => aggiunge l'avatar dell'utente
export const PatchUserAvatar = async (UserId, FD) => {
  console.log("DATA => Fetch => PatchUserAvatar");
  try {
    const res = await fetch(`${FetchUserUrl}/${UserId}`, {
      method: "PATCH",
      body: FD,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// todo CATEGORIES
// GET => recuperare una o tutte le categorie
export const GetCategories = async () => {
  console.log("DATA => Fetch => GetCategories");
  try {
    const res = await fetch(`${FetchCategoriesUrl}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// POST => creare una nuova categoria
export const PostCategory = async (FormValues) => {
  console.log("DATA => Fetch => PostCategory");
  try {
    const res = await fetch(`${FetchCategoriesUrl}`, {
      method: "POST",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// PUT /:CategoryId => modificare una categoria
export const PutCategory = async (CategoryId, FormValues) => {
  console.log("DATA => Fetch => PutCategory");
  try {
    const res = await fetch(`${FetchCategoriesUrl}/${CategoryId}`, {
      method: "PUT",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE /:CategoryId => eliminare una categoria
export const DeleteCategory = async (CategoryId) => {
  console.log("DATA => Fetch => DeleteCategory");
  try {
    const res = await fetch(`${FetchCategoriesUrl}/${CategoryId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// todo PAYMENTMETHODS
// GET => recuperare uno o tutti i metodi di pagamento
export const GetPaymentMethods = async () => {
  console.log("DATA => Fetch => GetPaymentMethods");
  try {
    const res = await fetch(`${FetchPaymentMethodsUrl}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// POST => creare un nuovo metodo di pagamento
export const PostPaymentMethod = async (FormValues) => {
  console.log("DATA => Fetch => PostPaymentMethod");
  try {
    const res = await fetch(`${FetchPaymentMethodsUrl}`, {
      method: "POST",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// PUT /:PaymentMethodId => modificare un metodo di pagamento
export const PutPaymentMethod = async (PaymentMethodId, FormValues) => {
  console.log("DATA => Fetch => PutPaymentMethod");
  try {
    const res = await fetch(`${FetchPaymentMethodsUrl}/${PaymentMethodId}`, {
      method: "PUT",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE /:PaymentMethodId => eliminare un metodo di pagamento
export const DeletePaymentMethod = async (PaymentMethodId) => {
  console.log("DATA => Fetch => DeletePaymentMethod");
  try {
    const res = await fetch(`${FetchPaymentMethodsUrl}/${PaymentMethodId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// todo TRANSACTIONS
// GET => recuperare una o tutte le transazioni
export const GetTransactions = async (id) => {
  console.log("DATA => Fetch => GetTransactions");
  try {
    const NewFetchTransactionsUrl = id
      ? `${FetchTransactionsUrl}/${id}`
      : `${FetchTransactionsUrl}`;
    const res = await fetch(`${NewFetchTransactionsUrl}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// POST => creare una nuova transazione
export const PostTransaction = async (FormValues) => {
  console.log("DATA => Fetch => PostTransaction");
  try {
    const res = await fetch(`${FetchTransactionsUrl}`, {
      method: "POST",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// PUT /:TransactionId => modificare una transazione
export const PutTransaction = async (TransactionId, FormValues) => {
  console.log("DATA => Fetch => PutTransaction");
  try {
    const res = await fetch(`${FetchTransactionsUrl}/${TransactionId}`, {
      method: "PUT",
      body: JSON.stringify(FormValues),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE /:TransactionId => eliminare una transazione
export const DeleteTransaction = async (TransactionId) => {
  console.log("DATA => Fetch => DeleteTransaction");
  try {
    const res = await fetch(`${FetchTransactionsUrl}/${TransactionId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
