import React from "react";
import TileCard from "../../components/tileCard";
import styles from "./diagnosticTest.module.css";

function DiagnosticTestHome() {
  return (
    <>
      <TileCard id={1} title="TestCard" description="Test description" />
      <button className={`${styles.addButton}`}>Create Test</button>
    </>
  );
}

export default DiagnosticTestHome;
