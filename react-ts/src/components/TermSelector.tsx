import React from "react";
import classes from "./../styles/TermSelector.module.css";

// a simple component for selecting with which contract user wants to interact

type TermSelectorProps = {
  setTerm: React.Dispatch<React.SetStateAction<boolean>>;
  term: boolean;
};

const TermSelector = ({ setTerm, term }: TermSelectorProps) => {
  return (
    <>
      <span
        className={`${classes.title} ${term ? classes.choosenL : ""}`}
        onClick={() => setTerm(true)}
      >
        Term savings
      </span>

      <span
        className={`${classes.text} ${!term ? classes.choosenR : ""}`}
        onClick={() => setTerm(false)}
      >
        Indefinite savings
      </span>
    </>
  );
};

export default TermSelector;
