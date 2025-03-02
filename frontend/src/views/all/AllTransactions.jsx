import {
  Button,
  Card,
  CardText,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  Row,
} from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import { SingleTransaction } from "../../components/transaction/SingleTransaction";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { GetCategories, GetTotals, GetTransactions } from "../../data/fetch";
import { CardLoader } from "../../components/loader/CardLoader";
import { AlertContext } from "../../context/AlertContextProvider";
import { MyAlert } from "../../components/utils/MyAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { NewTransaction } from "../../components/transaction/NewTransaction";

export const AllTransactions = () => {
  // * CONTEXT
  const { LoggedUser, Theme } = useContext(UserContext);
  const { ShowAlert, SetShowAlert, SetAlertFormValue } =
    useContext(AlertContext);
  // * STATI
  const [Transactions, SetTransactions] = useState(null);
  const TransactionId = useParams().transactionId;
  const [IsNewTransaction, SetIsNewTransaction] = useState(false);
  const [ResultSearch, SetResultSearch] = useState(null);
  const [Total, SetTotal] = useState(null);
  const [ResultSearchTotal, SetResultSearchTotal] = useState(0);
  const [Categories, SetCategories] = useState(null);
  // * FUNZIONI
  useEffect(() => {
    if (LoggedUser && !ShowAlert) {
      GetTransactions()
        .then((data) => SetTransactions(data))
        .catch((err) => {
          SetAlertFormValue(
            "getTransactions",
            "danger",
            "ERROR",
            "Errore nel recupero dei movimenti, riprova più tardi."
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 3 * 1000);
        });
    }
  }, [LoggedUser, ShowAlert]);
  // calcolo saldo
  useEffect(() => {
    Transactions &&
      GetTotals(LoggedUser._id)
        .then((data) => {
          SetTotal("€ " + (data.totalIn - data.totalOut).toFixed(2));
        })
        .catch(() => {
          SetAlertFormValue(
            "chart",
            "danger",
            "ERROR",
            "Errore nel recupero dei dati, riprova più tardi."
          ).then((AlertFormValue) => {
            SetShowAlert(AlertFormValue);
          });
          setTimeout(() => {
            SetShowAlert(false);
          }, 3 * 1000);
        });
  }, [Transactions, Total]);

  useEffect(() => {
    ResultSearch &&
      SetResultSearchTotal(
        ResultSearch.reduce(
          (acc, curr) =>
            curr.inOut === "in" ? acc + curr.amount : acc - curr.amount,
          0
        )
      );
    // console.table(ResultSearch);
    // console.table(Transactions);
  }, [ResultSearch]);

  // categorie
  useEffect(() => {
    LoggedUser && GetCategories().then((data) => SetCategories(data));
  }, [LoggedUser]);

  // filtro per categorie
  const HandleChangeCategory = (e) => {
    e.preventDefault();
    SetResultSearch(
      Transactions.filter((transaction) =>
        transaction.category.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
    if (!e.target.value) SetResultSearch(null);
  };

  // ricerca per negozio
  const HandleChange = (e) => {
    e.preventDefault();
    SetResultSearch(
      Transactions.filter((transaction) =>
        transaction.shop.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    if (!e.target.value) SetResultSearch(null);
  };

  if (!Transactions) return <CardLoader />;
  if (TransactionId) return <Outlet />;
  if (IsNewTransaction)
    return (
      <Container className="pt-4">
        <Row>
          <h1 className="text-center mb-3">Nuovo movimento</h1>
          <Col>
            <NewTransaction SetIsNewTransaction={SetIsNewTransaction} />
          </Col>
        </Row>
      </Container>
    );
  if (Transactions || ResultSearch)
    return (
      <Container className="pt-4">
        <Row>
          <h1 className="text-center mb-3">Movimenti in entrata e uscita</h1>
          <Col>
            <Card className="mb-3 shadow">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title>Elenco movimenti</Card.Title>
                <div className="text-center">
                  <CardText>Saldo: {Total}</CardText>
                  {ResultSearchTotal !== 0 && (
                    <CardText>Totale Categoria: {ResultSearchTotal} </CardText>
                  )}
                </div>
                <Button
                  variant={
                    Theme === "light" ? "outline-primary" : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => SetIsNewTransaction(true)}
                >
                  <span className="d-none d-md-inline">
                    Nuovo movimento &nbsp;
                  </span>
                  <FontAwesomeIcon
                    icon={faAdd}
                    size="xl"
                    onClick={() => SetIsNewTransaction(true)}
                  />
                </Button>
              </Card.Header>
              <Card.Body className="px-0">
                {ShowAlert?.Type === "getTransactions" && <MyAlert />}
                {!Transactions[0]?.date ? (
                  <Card.Text className="text-center">
                    Non ci sono movimenti.
                  </Card.Text>
                ) : (
                  <Form>
                    <FormGroup className="mb-3 mx-auto">
                      <FormControl
                        type="text"
                        onChange={HandleChange}
                        placeholder="Cerca un movimento nel negozio...."
                      />
                      <FormSelect
                        aria-label="Default select example"
                        onChange={HandleChangeCategory}
                      >
                        <option value={null}>Seleziona una categoria</option>
                        {Categories?.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </FormSelect>
                    </FormGroup>
                  </Form>
                )}

                {ResultSearch
                  ? ResultSearch.map((transaction, index) => (
                      <SingleTransaction
                        key={transaction._id}
                        transaction={transaction}
                        index={index}
                        type="mini"
                      />
                    ))
                  : Transactions.map((transaction, index) => (
                      <SingleTransaction
                        key={transaction._id}
                        transaction={transaction}
                        index={index}
                        type="mini"
                      />
                    ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};
