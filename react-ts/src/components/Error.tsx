import classes from "./../styles/Error.module.css";
import { useDispatch, useSelector } from "react-redux";
import { initalErrorType } from "../features/dataSlice";
const errorData = (state: any) => state.data.errorData;

type ErrorProps = {
  isOpen: boolean;
  term: boolean;
};

const Error = ({ isOpen, term }: ErrorProps) => {
  const dispatch = useDispatch();

  //setting Redux states with the Selector

  const errorTxData: initalErrorType = useSelector(errorData);

  // helper function for closing the error modal
  // and reseting the data to null

  const close = () => {
    dispatch({ type: "data/clearErrorMessage" });
    dispatch({ type: "control/closeError" });
  };

  return (
    <div>
      {isOpen && (
        <>
          <div className={classes.overlay} onClick={close}></div>
          <div className={classes.modal}>
            <header className={classes.modal__header}>
              <h2>Error message</h2>
              <button onClick={close} className={classes.closeButton}>
                &times;
              </button>
            </header>
            <main className={classes.modal__main}>
              <p className={classes.headText}>
                Transaction has encountered an error. Error has the message of:
              </p>
              <p className={classes.error_text}>{errorTxData.message}</p>
              {process.env.REACT_APP_ENVIROMENT === "development" && (
                <p>{`Error code provided: ${errorTxData.code}`}</p>
              )}
              <div className={classes.eth_div}>
                {errorTxData.txHash && (
                  <a
                    className={classes.etherscan_link}
                    href={`https://goerli.etherscan.io/tx/${errorTxData.txHash}`}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    Check transaction details here!
                  </a>
                )}
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Error;
