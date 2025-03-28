import React, { useState, useEffect } from "react";
import validatePositiveInt from "./functions/validatePositiveInt";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import Select from "./components/Select";
import Range from "./components/Range";
import RbGroup from "./components/RbGroup";
import NumImp from "./components/NumImp";
import TextArea from "./components/TextArea";
import Clock from "./components/Clock";
import Button from "./components/Button";
import saveText from "./functions/saveText";
import ChbGroup from "./components/ChbGroup";
import Image from "./components/Image";
import TextBox from "./components/TextBox";
import File from "./components/File";
import pics from "./pics/flower.jpg";

function App() {
  // ProgressBar
  const [initialCountDown, setInitialCountDown] = useState(0);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    let zadaneSekundy = prompt("Zadejte počet sekund:", 10);
    while (!validatePositiveInt(zadaneSekundy)) {
      zadaneSekundy = prompt("Zadejte celé kladné číslo:", 10);
    }
    setInitialCountDown(zadaneSekundy);
    setCountDown(zadaneSekundy);
  }, []);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      console.log(countDown);

      return () => clearTimeout(timer);
    }
  }, [countDown]);

  const progress =
    countDown > 0
      ? ((initialCountDown - countDown) / initialCountDown) * 100
      : 100;
  // console.log(progress);

  // /ProgressBar

  // Select
  const fruits = ["jablko", "hrozno", "maliny", "hruška", "broskve"];
  const [fruit, setFruit] = useState("hrozno");
  // Select

  // Range
  const [amount, setAmount] = useState(3);
  // /Range

  // RBGroup
  const qualityList = [
    { label: "Špatná", value: "A" },
    { label: "Běžná", value: "B" },
    { label: "Nejlepší", value: "C" },
  ];
  const [quality, setQuality] = useState("");

  // /RBGroup

  // NumImp
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  // /NumImp

  //TextArea
  const [textInArea, setTextInArea] = useState("");
  // /TextArea

  // saveText
  const handleEvent = (source) => {
    switch (source) {
      case "idDownload":
        saveText(textInArea);
        break;
      case "idResetProgrees":
        setCountDown(initialCountDown);
        break;
      case "idButtonEnable":
        setEnableImage(true);
        break;
      case "idButtonDisable":
        setEnableImage(false);
        break;
      default:
        break;
    }
  };
  // /saveText

  // ChbGroup
  const [checkedBox, setCheckedBox] = useState([]);
  const checkList = [
    { label: "Checkbox 1", value: "1" },
    { label: "Checkbox 2", value: "2" },
    { label: "Checkbox 3", value: "3" },
    { label: "Checkbox 4", value: "4" },
    { label: "Checkbox 5", value: "5" },
    { label: "Checkbox 6", value: "6" },
    { label: "Checkbox 7", value: "7" },
    { label: "Checkbox 8", value: "8" },
  ];
  // /ChbGroup

  // Image
  const [enableImage, setEnableImage] = useState(true);
  // /Image

  // handlery - vylepšené - nechci používat "switch"
  const handlers = {
    selFruits: setFruit,
    "rng-amount": setAmount,
    jakost: setQuality,
    number1: setNum1,
    number2: setNum2,
    textArea: setTextInArea,
    idCheckGroup: setCheckedBox,
  };

  const handleData = (data, source) => {
    if (handlers[source]) {
      handlers[source](data);
      console.log(`${source}: ${data}`);
    }
  };
  // /handlery - vylepšené
  
  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row p-4">
          <div className="col-6">
            <Select
              dataIn={fruits}
              label="Ovoce"
              selectedValue={fruit}
              id="selFruits"
              handleData={handleData}
            />
            <Range
              dataIn={amount}
              handleData={handleData}
              id="rng-amount"
              label="Množství"
              max="20"
              min="0"
            />
            <p>
              {fruit}, {amount} kg, {quality}
            </p>
            <div className="row">
              <div className="col-6">
                <NumImp
                  dataIn={num1}
                  handleData={handleData}
                  id="number1"
                  label="Číslo 1"
                />
              </div>
              <div className="col-6">
                <NumImp
                  dataIn={num2}
                  handleData={handleData}
                  id="number2"
                  label="Číslo 2"
                />
              </div>
            </div>
            <p>Součin je {num1 * num2}</p>
            <TextArea
              dataIn={textInArea}
              handleData={handleData}
              height="200"
              id="textArea"
              label="Operace s textem"
            />
            <div className="row  my-3">
              <div className="col-6">
                <File
                  handleData={setTextInArea}
                  id="idFile"
                  label="Načti text ze souboru"
                />
              </div>
              <div className="col-6">
                <Button
                  handleEvent={handleEvent}
                  id="idDownload"
                  label="Stáhni soubor s textem"
                />
              </div>
            </div>

            <p>
              Aktuální čas: <Clock />, Počet zaškrtnutých políček:{" "}
              {checkedBox.length}
            </p>
          </div>
          <div className="col-6">
            <RbGroup
              dataIn={qualityList}
              handleData={handleData}
              id="jakost"
              label="Jakost ovoce"
              selectedValue={quality}
            />
            <div className="my-3">
              <ChbGroup
                dataIn={checkList}
                handleData={handleData}
                id="idCheckGroup"
                label="Čekboxy"
                selectedValue={checkedBox}
              />
            </div>
            <div className="d-grid">
              <Button
                handleEvent={handleEvent}
                id="idResetProgrees"
                label="Resetuj ProgressBar"
              />
            </div>
            <div className="row my-3">
              <div className="col-6 d-grid">
                <Button
                  handleEvent={handleEvent}
                  id="idButtonEnable"
                  label="Zobrazit obrázek"
                />
              </div>
              <div className="col-6 d-grid">
                <Button
                  handleEvent={handleEvent}
                  id="idButtonDisable"
                  label="Skrýt obrázek"
                />
              </div>
            </div>
            <Image
              enabled={enableImage}
              id="idPhoto"
              source={pics}
              width="100%"
            />
          </div>
        </div>
        <ProgressBar id="pgb-progress" dataIn={progress} />
      </div>
    </div>
  );
}

export default App;
