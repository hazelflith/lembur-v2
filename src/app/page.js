'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';

export default function Home() {

  const [gajiPokok, setGajiPokok] = useState()
  const [gajiPokokShow, setGajiPokokShow] = useState()
  const [view, setView] = useState(false)
  const [theme, setTheme] = useState(false)
  const [viewSaveAlert, setViewSaveAlert] = useState(false)
  const [viewLoadAlert, setViewLoadAlert] = useState(false)
  const [temp, setTemp] = useState(0)
  const [totalLembur, setTotalLembur] = useState(0)
  const [arrTotalLembur, setArrTotalLembur] = useState([])
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  const [inputFieldsLibur, setInputFieldsLibur] = useState([]);
  const [tarifLembur, setTarifLembur ] = useState(0)
  const [lemburLibur, setLemburLibur] = useState(0)
  const [lemburKerja, setLemburKerja] = useState(0)
  const [hariLemburLibur, setHariLemburLibur] = useState(0)
  const [hariLemburKerja, setHariLemburKerja] = useState(0)
  const [hariLemburTotal, setHariLemburTotal] = useState(0)
  const [formattedJamLembur, setFormattedJamLembur] = useState('0.00');
  
  const harilemburRef = React.useRef(null);
  const prevJamLembur = React.useRef(0);

  const handlerTarif = (value) => {
    if(value){
      setGajiPokokShow(value);
      setGajiPokok(convertRupiahStringToNumber(value));
      setTarifLembur((1 / 173) * 1 * convertRupiahStringToNumber(value))
    }
  }

  function convertRupiahStringToNumber(rupiahString) {
    // Remove non-numeric characters
    const numericString = rupiahString.replace(/[^0-9,]/g, '');
  
    // Replace commas with dots (for thousands separator)
    const formattedString = numericString.replace(/,/g, '.');
  
    // Parse the string as a float
    const number = parseFloat(formattedString);
  
    return number;
  }

  // Explicitly generate the pattern for 24 hours (1440 minutes)
  const hariKerja = (() => {
    const obj = {};
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min++) {
        const totalMin = hour * 60 + min;
        let value = hour;
        if (min < 15) value += 0;
        else if (min < 30) value += 0.25;
        else if (min < 45) value += 0.5;
        else value += 0.75;
        obj[totalMin] = value;
      }
    }
    obj[1440] = 24;
    return obj;
  })();

  const hariLibur = {
    "0":0,
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10,
    "6": 12,
    "7": 14,
    "8": 16,
    "9": 19,
    "10": 23,
    "11": 27,
    "12": 31,
    "13": 35,
    "14": 39,
    "15": 43,
    "16": 47,
    "17": 51,
    "18": 55,
    "19": 59,
    "20": 63,
    "21": 67,
    "22": 71,
    "23": 75,
    "24": 79
  }
  const calculateHariLemburKerja = () => {
    let totalHariLemburKerja = 0

    for (let index = 0; index < inputFields.length; index++) {
      if(inputFields[index].value == ''){
        totalHariLemburKerja = parseInt(totalHariLemburKerja) + 0
      }
      else{
        totalHariLemburKerja = parseInt(totalHariLemburKerja) + parseInt(inputFields[index].value)
      }
    }
    setHariLemburKerja(totalHariLemburKerja)
  }
  const calculateHariLemburLibur = () => {
    let totalHariLemburLibur = 0

    for (let index = 0; index < inputFieldsLibur.length; index++) {
      if(inputFieldsLibur[index].value == ''){
        totalHariLemburLibur = parseInt(totalHariLemburLibur) + 0
      }
      else{
        totalHariLemburLibur = parseInt(totalHariLemburLibur) + parseInt(inputFieldsLibur[index].value)
      }
    }
    setHariLemburLibur(totalHariLemburLibur)
  }
  const calculateLemburHariKerja = () => {
      let totalLemburHariKerja = 0

      inputFields.forEach((data)=>{
        if(data.value){
          // Convert minutes back to hours for the calculation
          const hours = data.value;
          totalLemburHariKerja += hariKerja[Math.floor(hours).toString()] * tarifLembur 
        }
      })
      return Math.round(totalLemburHariKerja)
  }


  const calculateLemburHariLibur = () => { 
      let totalLemburHariLibur = 0

      inputFieldsLibur.forEach((data)=>{
        if(data.value){
          totalLemburHariLibur += hariLibur[data.value.toString()] *  tarifLembur
        }     
      })
      return Math.round(totalLemburHariLibur)
  }


    const handleAddInput = () => {
      const newInputFields = [...inputFields, { value: '' }];
      setInputFields(newInputFields);
    };
    
    const handleCountLemburKerja = () => {
      setLemburKerja(calculateLemburHariKerja())
    }
    const handleCountLemburLibur = () => {
      setLemburLibur(calculateLemburHariLibur())
    }

    const handleInputChange = (index, event) => {
      const newInputFields = [...inputFields];
      const value = event.target.value;
      
      // Only allow numbers and one decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        newInputFields[index].value = value;
        setInputFields(newInputFields);
      }
    };

    const handleKeyPress = (index, event) => {
      if (event.key === 'Enter') {
        const newInputFields = [...inputFields];
        const inputValue = event.target.value;

        let totalMinutes = 0;
        if (inputValue.includes('.')) {
          const [hoursStr, decimalStr] = inputValue.split('.');
          const hours = parseInt(hoursStr, 10);
          let minutes = 0;
          if (decimalStr.length === 1) {
            // Fractional hour
            minutes = Math.round(parseFloat('0.' + decimalStr) * 60);
          } else if (decimalStr.length === 2) {
            // Direct minutes
            minutes = parseInt(decimalStr, 10);
          }
          totalMinutes = (isNaN(hours) ? 0 : hours) * 60 + (isNaN(minutes) ? 0 : minutes);
        } else {
          // No decimal, treat as hours
          const hours = parseInt(inputValue, 10);
          totalMinutes = isNaN(hours) ? 0 : hours * 60;
        }
        // Clamp to 0-1440
        totalMinutes = Math.max(0, Math.min(1440, totalMinutes));
        newInputFields[index].value = totalMinutes;
        setInputFields(newInputFields);
        calculateHariLemburKerja();
        handleCountLemburKerja();
      }
    };

    


    const handleAddInputLibur = () => {
      const newInputFieldsLibur = [...inputFieldsLibur, { value: '' }];
      setInputFieldsLibur(newInputFieldsLibur);
    };

    function splitEveryN(str, n) {
      const arr = [];
      str = str.toString()
      let index = str.length;

      while (index > 0) {
          const endIndex = index;
          const startIndex = Math.max(endIndex - 3, 0);
          arr.unshift(parseInt(str.slice(startIndex, endIndex)));
          index = startIndex;
      }

      return arr;
    }

    //Step 2
    useEffect(() => {
      setLemburKerja(calculateLemburHariKerja())
      setLemburLibur(calculateLemburHariLibur())
      setTemp(temp+1)
    }, [lemburKerja,lemburLibur,gajiPokok])
    //Step 3
    useEffect(() => {
      setTotalLembur(lemburKerja + lemburLibur)
    }, [temp])
    useEffect(() => {
      setArrTotalLembur(splitEveryN(totalLembur, 3))    
    }, [totalLembur])
    useEffect(() => {
      console.log(arrTotalLembur)
      for (let i = 0; i < arrTotalLembur.length; i++) {
        document.querySelector("#lembur" + i).style.setProperty("--num", arrTotalLembur[i]);
        if (i > 0){
          console.log(arrTotalLembur[i].toString().length)
          if (arrTotalLembur[i].toString().length == 3){
          
              document.querySelector("#lemburbefore" + i).innerHTML = '';
          
          }
          if (arrTotalLembur[i].toString().length == 2){

              document.querySelector("#lemburbefore" + i).innerHTML = '0';
           
          }
          if (arrTotalLembur[i].toString().length == 1){
          
              document.querySelector("#lemburbefore" + i).innerHTML = '00';
         
          }
          
        }
        
      }  
    }, [arrTotalLembur])

    useEffect(() => {
      let temp
      console.log(hariLemburKerja)
      console.log(hariLemburLibur)
      temp = parseInt(hariLemburKerja) + parseInt(hariLemburLibur)
      console.log(temp)
      setHariLemburTotal(temp)
    }, [hariLemburKerja, hariLemburLibur])

    useEffect(() => {
      setTimeout(() => {
        setViewLoadAlert(false)
        setViewSaveAlert(false)
      }, 5000);
    }, [viewLoadAlert, viewSaveAlert])
    

    useEffect(() => {
      // Convert total minutes to hours.minutes format
      const hours = Math.floor(hariLemburTotal / 60);
      const minutes = hariLemburTotal % 60;
      const formattedTime = `${hours}.${minutes.toString().padStart(2, '0')}`;
      const harilemburElement = harilemburRef.current;
      if (harilemburElement) {
        harilemburElement.style.setProperty("--num2", formattedTime);
        harilemburElement.offsetHeight;
      }

      // Animate the number in JS
      let start = prevJamLembur.current;
      let end = hariLemburTotal;
      let startTime = null;
      const duration = 600; // ms

      function animateNumber(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const current = Math.round(start + (end - start) * progress);
        const h = Math.floor(current / 60);
        let m = current % 60;
        // Clamp minutes to 0-59 and always show two digits
        m = Math.max(0, Math.min(59, m));
        const formatted = `${h}.${m.toString().padStart(2, '0')}`;
        console.log('Animated:', {current, h, m, formatted});
        setFormattedJamLembur(formatted);
        if (progress < 1) {
          requestAnimationFrame(animateNumber);
        } else {
          prevJamLembur.current = end;
        }
      }
      requestAnimationFrame(animateNumber);
    }, [hariLemburTotal]);

    const handleInputChangeLibur = (index, event) => {
      const newInputFieldsLibur = [...inputFieldsLibur];
      if(event.target.value <= 24){
        newInputFieldsLibur[index].value = event.target.value;
      }
      else{
        event.target.value = 24
        newInputFieldsLibur[index].value = event.target.value;
      }
      calculateHariLemburLibur();
      handleCountLemburLibur()
    };
    const saveData = () =>{
      localStorage.setItem('gajiPokok', gajiPokok)
      localStorage.setItem('gajiPokokShow', gajiPokokShow)
      localStorage.setItem('inputFields', JSON.stringify(inputFields))
      localStorage.setItem('inputFieldsLibur', JSON.stringify(inputFieldsLibur))
      localStorage.setItem('tarifLembur', tarifLembur)
      localStorage.setItem('lemburLibur', lemburLibur)
      localStorage.setItem('lemburKerja', lemburKerja)
      localStorage.setItem('hariLemburTotal', hariLemburTotal)
      setViewSaveAlert(true)
    }
    const loadData = () => {
      if(localStorage.getItem('gajiPokok')){
        const gaji = localStorage.getItem('gajiPokok')
        const gajiShow = localStorage.getItem('gajiPokokShow')
        const tarif = localStorage.getItem('tarifLembur')
        const dataLibur = localStorage.getItem('lemburLibur')
        const dataKerja = localStorage.getItem('lemburKerja')
        const dataHari = localStorage.getItem('hariLemburTotal')
        const dataLemburKerja = localStorage.getItem('inputFields')
        const dataLemburLibur = localStorage.getItem('inputFieldsLibur')
        const dataLemburKerjaParsed = JSON.parse(dataLemburKerja)
        const dataLemburLiburParsed = JSON.parse(dataLemburLibur)
        setGajiPokok(gaji)
        setGajiPokokShow(gajiShow)
        setTarifLembur(tarif)
        setLemburLibur(dataLibur)
        setLemburKerja(dataKerja)
        setInputFields(dataLemburKerjaParsed)
        setInputFieldsLibur(dataLemburLiburParsed)
        setHariLemburTotal(dataHari)
        setViewLoadAlert(true)
      }
    }

    const handleQris = () => {
      window.scrollTo(0, 0);
      if(view == false){
        setView(true)
      }
      else{
        setView(false)
      }
    }
    const switchTheme = () => {
      if(theme){
        setTheme(false)
      }
      else{
        setTheme(true)
      }
    }
    
    useEffect(() => {
      if(theme){
        document.querySelector(":root").style.setProperty("--main-background", "black");
        document.querySelector(":root").style.setProperty("--bs-heading-color", "#00dc82");
        document.querySelector(":root").style.setProperty("--bs-body-color", "#00dc82");
        document.querySelector(":root").style.setProperty("--bs-border-color", "#00dc82");
        document.querySelector(":root").style.setProperty("--bs-body-bg", "black");
        document.querySelector(":root").style.setProperty("--placeholder", "green");
        document.querySelector(":root").style.setProperty("--text-color", "#00dc82");
        document.querySelector(":root").style.setProperty("--add-button", "black");
        document.querySelector(":root").style.setProperty("--btn-success", "black");
        document.querySelector(":root").style.setProperty("--btn-success-color", "#198754");
        document.querySelector(":root").style.setProperty("--btn-danger", "black");
        document.querySelector(":root").style.setProperty("--btn-danger-color", "#dc3545");
        document.querySelector(":root").style.setProperty("--add-button-hover", "rgb(27, 27, 27)");
        document.querySelector(":root").style.setProperty("--links", "#00dc82");
      }
      else{
        document.querySelector(":root").style.setProperty("--main-background", "white");
        document.querySelector(":root").style.setProperty("--bs-heading-color", "black");
        document.querySelector(":root").style.setProperty("--bs-body-color", "black");
        document.querySelector(":root").style.setProperty("--bs-border-color", "rgb(118, 118, 118)");
        document.querySelector(":root").style.setProperty("--bs-body-bg", "white");
        document.querySelector(":root").style.setProperty("--placeholder", "gray");
        document.querySelector(":root").style.setProperty("--text-color", "black");
        document.querySelector(":root").style.setProperty("--add-button", "rgb(217, 217, 217)");
        document.querySelector(":root").style.setProperty("--add-button-hover", "rgb(198, 198, 198)");
        document.querySelector(":root").style.setProperty("--btn-success", "#198754");
        document.querySelector(":root").style.setProperty("--btn-success-color", "white");
        document.querySelector(":root").style.setProperty("--btn-danger", "#dc3545");
        document.querySelector(":root").style.setProperty("--btn-danger-color", "white");
        document.querySelector(":root").style.setProperty("--links", "blue");
      }
      
    }, [theme])
    
    const handleCalculate = () => {
      calculateHariLemburKerja();
      handleCountLemburKerja();
    };

    return (
      <main>
        <div className="container mw-425 pb-5">
          {totalLembur > 3000000 && <div class="money"></div>}
            <div className="navbar fixed-top mw-425 mx-auto px-2 pb-0">
              <div class="">
                <div className="d-flex py-3 pb-2">
                  <h1>Lembur Calc v4</h1>
                  {/* <div class="toggle-wrapper">
                    <div class = 'toggle-switch'>
                    <label>
                    <input type = 'checkbox' class="switch-input"/>
                    <span class = 'slider' onClick={switchTheme}></span>
                    </label>
                    </div>
                  </div> */}
                  <div class="toggleWrapper">
                    <input type="checkbox" class="dn" id="dn"/>
                    <label for="dn" onClick={switchTheme} class="toggle">
                      <span class="toggle__handler">
                        <span class="crater crater--1"></span>
                        <span class="crater crater--2"></span>
                        <span class="crater crater--3"></span>
                      </span>
                      <span class="star star--1"></span>
                      <span class="star star--2"></span>
                      <span class="star star--3"></span>
                      <span class="star star--4"></span>
                      <span class="star star--5"></span>
                      <span class="star star--6"></span>
                    </label>
                  </div>
                </div>
                <p class="m-0">Adjusted to Quantum Calculation</p>
                <div className="mb-2">
                  <h6>Gaji Pokok :</h6>
                  <CurrencyFormat value={gajiPokokShow} thousandSeparator={'.'} prefix={'Rp.'} decimalSeparator=','  className='mb-2 form-control'
                    onChange={(event)=>handlerTarif(event.target.value)}
                    placeholder= "Jumlah Gaji Pokok"
                  />
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className='col-6'>
                    <h6>Total Lembur Anda :</h6>
                    <div className={`d-flex ${totalLembur > 3000000 ? "color-gold" : (totalLembur > 2000000 ? "color-green" : (totalLembur > 1000000 ? "color-blue" : ""))}  `}>
                      Rp{arrTotalLembur.map((arr, index) => (
                        <>
                          <div class="lemburwrapper d-flex">
                            .<div id={"lemburbefore" + index}/><div class="totalgaji" id={"lembur" + index}/>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  <div className='col-6'>
                    <h6>Total Jam Lembur :</h6>
                    <div class="d-flex">
                        <div class="harilembur me-1" ref={harilemburRef}>{formattedJamLembur}</div>
                      Jam
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className='btn btn-danger me-2' onClick={loadData}>Load Data</div>
                  <div className='btn btn-success' onClick={saveData}>Save Data</div>
                </div>
                <p className="donasi mt-2" onClick={handleQris}>Donasi ke Developer :D</p>
                {viewSaveAlert && <div class="alert alert-success animate" role="alert">
                  Save data sukses!
                </div>}
                {viewLoadAlert && <div class="alert alert-success animate" role="alert">
                  Load data sukses!
                </div>}
                
                <hr></hr>
              </div>
            </div>
            <div class="scroll">
              {view && 
                <div className="qris animate mb-2"></div>
              }
              <div className="row g-2">
              <h5>Hari Kerja</h5>
                {inputFields.map((inputField, index) => (
                    <div key={index} className="col-4 mb-4 animate">
                      <h6>Hari {index+1} :</h6>
                      <input
                        className='form-control'
                        type="number"
                        step="0.01"
                        placeholder={`Jam Lembur`}
                        value={inputField.value}
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyPress={(event) => handleKeyPress(index, event)}
                      />
                    </div>
                ))}
                <div class="col-4 mb-4 align-self-end">
                  <div class="d-flex add-button form-control" onClick={handleAddInput}>
                    <ion-icon name="add-outline" class="my-auto mx-auto"></ion-icon>
                  </div>
                </div>
              </div>
              <hr className='mb-4'></hr>
              {/* <div className="row g-2">
                <h5>Hari Libur</h5>
                {inputFieldsLibur.map((inputFieldLibur, index) => (
                  <div key={index} className="col-4 mb-4 animate">
                    <h6>Hari {index+1} :</h6>
                    <input
                      type="number"
                      className='form-control'
                      placeholder="Jam Lembur"
                      value={inputFieldLibur.value}
                      onChange={(event) => handleInputChangeLibur(index, event)}
                    />
                  </div>
                ))}
                <div class="col-4 mb-4 align-self-end">
                  <div class="d-flex add-button form-control" onClick={handleAddInputLibur}>
                    <ion-icon name="add-outline" class="my-auto mx-auto"></ion-icon>
                  </div>
                </div>
              </div> */}
            </div>
        </div>
      </main>
    )
  }
