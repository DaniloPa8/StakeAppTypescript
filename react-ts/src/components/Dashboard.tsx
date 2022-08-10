import React, { useContext, useState, useEffect } from "react";

import classes from "./../styles/Dashboard.module.css";

// Component imports

import Error from "./Error";
import Savings from "./Savings";
import Withdraw from "./Withdraw";
import Stop from "./Stop";
import GetSavings from "./GetSavings";
import OwnerPanel from "./OwnerPanel";
import Manual from "./Manual";
import AboutUs from "./AboutUs";
import ConnContext from "./Conn-context";
import { ConnContextInterface } from "./Conn-context";
import Circle from "react-spinners/CircleLoader";
import Receipt from "./Receipt";
import Token from "./Token";
import Sidebar from "./Sidebar";

// -----------------

import { useSelector } from "react-redux";
import { dispatchError } from "../utils/utils";

import LoadingOverlay from "react-loading-overlay-ts";

// Getting the redux states

const selectLoading = (state: any) => state.control.loading;
const selectReceipt = (state: any) => state.control.receiptOpen;
const selectError = (state: any) => state.control.errorOpen;
const selectInput = (state: any) => state.control.waitingForInput;

// Component
type handlerFunction = () => void;

const Dashboard: React.FC = () => {
  //setting Redux states with the Selector

  const loading: boolean = useSelector(selectLoading);
  const openError: boolean = useSelector(selectError);
  const openReceipt: boolean = useSelector(selectReceipt);
  const waitingForInput: boolean = useSelector(selectInput);

  // Consuming the context

  const connectionContext = useContext<ConnContextInterface>(ConnContext);

  // Setting modal states

  const [ownerOpen, setOwnerOpen] = useState<boolean>(false);
  const [manualOpen, setManualOpen] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [tokenOpen, setTokenOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Setting the main div's state

  const [selectedSection, setSelectedSection] = useState<number>(0);

  // State for checking and displaying the owner modal button

  const [isOwner, setIsOwner] = useState<boolean>(false);

  // State for defining with witch contract to interact

  const [term, setTerm] = useState<boolean>(true);

  // UseEffect for checking if the current user is owner

  useEffect(() => {
    try {
      if (
        process.env.REACT_APP_OWNER_ADDR!.toLowerCase() ===
        connectionContext?.account?.toLowerCase()
      )
        setIsOwner(true);
    } catch (err) {
      dispatchError(err.message);
    }
  }, []);

  // Savings section

  const savingsOpenHandler: handlerFunction = () => {
    setSelectedSection(1);
    if (menuOpen) setMenuOpen(false);
  };

  // Withdraw section
  const withdrawOpenHandler: handlerFunction = () => {
    setSelectedSection(2);
    if (menuOpen) setMenuOpen(false);
  };

  // Stop savings section

  const stopOpenHandler: handlerFunction = () => {
    setSelectedSection(3);
    if (menuOpen) setMenuOpen(false);
  };

  // Get savings section
  const getOpenHandler: handlerFunction = () => {
    setSelectedSection(4);
    if (menuOpen) setMenuOpen(false);
  };
  // Close handler
  const closeMainHandler: handlerFunction = () => setSelectedSection(0);

  // Owner panel section
  const ownerHandler: handlerFunction = () => setOwnerOpen((prev?) => !prev);

  // Token panel section
  const tokenHandler: handlerFunction = () => setTokenOpen((prev) => !prev);

  // Manual modal section
  const manualHandler: handlerFunction = () => setManualOpen((prev) => !prev);

  // About modal section
  const aboutHandler: handlerFunction = () => setAboutOpen((prev) => !prev);

  //Mobile menu
  const menuHandler: handlerFunction = () => {
    setMenuOpen((prev) => !prev);
    closeMainHandler();
  };

  return (
    // Overlay
    <LoadingOverlay
      active={loading}
      spinner={<Circle className={classes.loading_overlay_content} />}
      text={`${
        waitingForInput
          ? "Waiting for user to sign the transaction..."
          : "Waiting for transaction execution on blockchain. Please wait..."
      }`}
      className="_loading_overlay_wrapper_base"
      styles={{
        overlay: (base) => ({
          ...base,
        }),
        wrapper: (base) => ({
          ...base,
          height: "100%",
          width: "100%",
        }),
        spinner: (base) => ({
          ...base,
        }),
        content: (base) => ({
          ...base,
        }),
      }}
    >
      <div
        className={menuOpen ? classes.main_frame_menu_open : classes.main_frame}
      >
        {/* Sidebar */}
        <Sidebar
          menuHandler={menuHandler}
          ownerHandler={ownerHandler}
          tokenHandler={tokenHandler}
          aboutHandler={aboutHandler}
          manualHandler={manualHandler}
          menuOpen={menuOpen}
          isOwner={isOwner}
        />

        {/* Main */}

        {/* Savings section */}
        <div className={classes.main_content}>
          {selectedSection !== 1 && (
            <div
              className={`${classes.start_savings} ${classes.animate_fade}`}
              onClick={savingsOpenHandler}
            >
              <span>Start savings</span>
            </div>
          )}
          {selectedSection === 1 && (
            <Savings
              closeSavings={closeMainHandler}
              setTerm={setTerm}
              term={term}
            />
          )}

          {/* Withdraw Section */}
          {selectedSection !== 2 && (
            <div
              className={`${classes.withdraw_savings} ${classes.animate_fade}`}
              onClick={withdrawOpenHandler}
            >
              <p>Withdraw savings</p>
            </div>
          )}
          {selectedSection === 2 && (
            <Withdraw
              closeWithdraw={closeMainHandler}
              setTerm={setTerm}
              term={term}
            />
          )}

          {/* Owner modal section */}
          {ownerOpen && (
            <OwnerPanel
              closeModal={ownerHandler}
              isOpen={ownerOpen}
              setTerm={setTerm}
              term={term}
            />
          )}
          {/* Token modal section */}
          {tokenOpen && (
            <Token
              closeModal={tokenHandler}
              isOpen={tokenOpen}
              setTerm={setTerm}
              term={term}
            />
          )}

          {/* Manual modal section */}
          {manualOpen && (
            <Manual closeModal={manualHandler} isOpen={manualOpen} />
          )}

          {/* AboutUs modal section */}
          {aboutOpen && (
            <AboutUs closeModal={aboutHandler} isOpen={aboutOpen} />
          )}

          {/* Stop savings section */}
          {selectedSection !== 3 && (
            <div
              className={`${classes.stop_savings} ${classes.animate_fade}`}
              onClick={stopOpenHandler}
            >
              <p>Stop savings</p>
            </div>
          )}
          {selectedSection === 3 && <Stop closeStop={closeMainHandler} />}

          {/* Get savings section */}
          {selectedSection !== 4 && (
            <div
              className={`${classes.get_savings} ${classes.animate_fade}`}
              onClick={getOpenHandler}
            >
              <p>Get savings details</p>
            </div>
          )}
          {selectedSection === 4 && (
            <GetSavings
              closeGetSavings={closeMainHandler}
              setTerm={setTerm}
              term={term}
            />
          )}

          {/* Recipt & Error modals */}
          {openReceipt && <Receipt isOpen={openReceipt} />}
          {openError && <Error isOpen={openError} term={term} />}
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Dashboard;
