import generatePDF, { Options } from "react-to-pdf";
import CrimeDataChart from "./component/CrimeDataChart";

const options= {
  filename: "Burglary_arrests.pdf"
};

const getTargetElement = () => document.getElementById("chart");

const downloadPdf = () => generatePDF(getTargetElement, options);

const App = () => {
  return (
    <>
      <button onClick={downloadPdf} style={{margin:'5px'}}>Download PDF</button>
      <div id="chart">
       <CrimeDataChart />
      </div>
    </>
  );
};

export default App;
