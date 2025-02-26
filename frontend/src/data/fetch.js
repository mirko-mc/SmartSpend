// dichiaro i vari url per le chiamate al server
const FetchAuthenticationUrl = `${process.env.REACT_APP_API_URL}/api/v1/auth`;
const FetchUserUrl = `${process.env.REACT_APP_API_URL}/api/v1/user`;
const FetchCategoriesUrl = `${process.env.REACT_APP_API_URL}/api/v1/category`;
const FetchPaymentMethodsUrl = `${process.env.REACT_APP_API_URL}/api/v1/paymentMethod`;
const FetchTransactionsUrl = `${process.env.REACT_APP_API_URL}/api/v1/transactions`;

// * AUTHENTICATION
// POST /login => restituisce token di accesso, non protetta
export const PostLogin = async (FormValues) => {
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
  try {
    const res = await fetch(`${FetchAuthenticationUrl}/me`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    console.log("TOKEN rimosso, effettuare nuovamente l'accesso");
  }
};

// POST /register => crea un nuovo utente
export const PostRegister = async (FormValues) => {
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

// * USER
// GET /:UserId => recupera l'utente
export const GetUser = async (UserId) => {
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

// * CATEGORIES
// GET => recuperare tutte le categorie
export const GetCategories = async () => {
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

// GET /:categoryId => recuperare una categorie
export const GetCategory = async (CategoryId) => {
  try {
    const res = await fetch(`${FetchCategoriesUrl}/${CategoryId}`, {
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

// * PAYMENT METHODS
// GET /:paymentMethodId => recuperare un metodo di pagamento
export const GetPaymentMethod = async (PaymentMethodId) => {
  try {
    const res = await fetch(`${FetchPaymentMethodsUrl}/${PaymentMethodId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// GET "" => recuperare tutti i metodi di pagamento
export const GetPaymentMethods = async () => {
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

// POST "" => creare un nuovo metodo di pagamento
export const PostPaymentMethod = async (FormValues) => {
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

// * TRANSACTIONS
// GET /:transactionId => recuperare una transazione
export const GetTransaction = async (TransactionId) => {
  try {
    const res = await fetch(`${FetchTransactionsUrl}/${TransactionId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// GET => recuperare tutte le transazioni
export const GetTransactions = async () => {
  try {
    const res = await fetch(`${FetchTransactionsUrl}`, {
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

// DELETE /totals => eliminare una transazione
export const GetTotals = async () => {
  try {
    const res = await fetch(`${FetchTransactionsUrl}/totals`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
