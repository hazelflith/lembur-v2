'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';

export default function Home() {

  const [gajiPokok, setGajiPokok] = useState()
  const [gajiPokokShow, setGajiPokokShow] = useState()
  const [view, setView] = useState(false)
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
  
  const handlerTarif = (value) => {
    if(value){
      setGajiPokokShow(value);
      setGajiPokok(convertRupiahStringToNumber(value));
      setTarifLembur((1 / 173) * 0.57 * convertRupiahStringToNumber(value))
    }
  }

  function convertRupiahStringToNumber(rupiahString) {
    // Remove non-numeric characters
    const numericString = rupiahString.replace(/[^0-9,]/g, '');
  
    // Replace commas with dots (for thousands separator)
    const formattedString = numericString.replace(/,/g, '.');
  
    // Parse the string as a float
    const number = parseFloat(formattedString);
  
    return number;
  }

  const hariKerja = {
    "0":0,
    "1": 1.5,
    "2": 3.5,
    "3": 5.5,
    "4": 7.5,
    "5": 9.5,
    "6": 11.5,
    "7": 13.5,
    "8": 15.5,
    "9": 17.5,
    "10": 19.5,
    "11": 21.5,
    "12": 23.5,
    "13": 25.5,
    "14": 27.5,
    "15": 29.5,
    "16": 31.5,
    "17": 33.5,
    "18": 35.5,
    "19": 37.5,
    "20": 39.5,
    "21": 41.5,
    "22": 43.5,
    "23": 45.5,
    "24": 47.5
}

const hariLibur = {
  "0":0,
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10,
    "6": 12,
    "7": 14,
    "8": 17,
    "9": 21,
    "10": 25,
    "11": 29,
    "12": 33,
    "13": 37,
    "14": 41,
    "15": 45,
    "16": 49,
    "17": 53,
    "18": 57,
    "19": 61,
    "20": 65,
    "21": 69,
    "22": 73,
    "23": 77,
    "24": 81
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
        totalLemburHariKerja += hariKerja[data.value.toString()] *  tarifLembur 

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
    if(event.target.value <= 24){
      newInputFields[index].value = event.target.value;
    }
    else{
      event.target.value = 24
      newInputFields[index].value = event.target.value;
    }
    setInputFields(newInputFields);
    calculateHariLemburKerja();
    handleCountLemburKerja()
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
    temp = hariLemburKerja + hariLemburLibur
    console.log(temp)
    setHariLemburTotal(temp)
  }, [hariLemburKerja, hariLemburLibur])

  useEffect(() => {
    document.querySelector(".harilembur").style.setProperty("--num2", hariLemburTotal);
  }, [hariLemburTotal])
  
  
  

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
  }
  const loadData = () => {
    if(localStorage.getItem('gajiPokok')){
      const gaji = localStorage.getItem('gajiPokok')
      const gajiShow = localStorage.getItem('gajiPokokShow')
      const tarif = localStorage.getItem('tarifLembur')
      const dataLibur = localStorage.getItem('lemburLibur')
      const dataKerja = localStorage.getItem('lemburKerja')
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
  return (
    <main>
      <div className="container mw-425 pb-5">
        {totalLembur > 3000000 && <div class="money"></div>}
          <div className="navbar fixed-top mw-425 mx-auto px-2 pb-0">
            <div class="">
              <div className="py-3">
                <h1>Lembur Calc 2.0</h1>
              </div>
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
                  <div className={`d-flex ${totalLembur > 3000000 ? "color-gold" : ""} ${totalLembur > 2000000 ? "color-green" : ""} ${totalLembur > 1000000 ? "color-blue" : ""}`}>
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
                    {hariLemburTotal > 72 ? (
                      <div class="color-red harilembur me-1"></div>
                    ) : (
                      <div class="harilembur me-1"></div>
                    )}
                    Jam
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className='btn btn-danger me-2' onClick={loadData}>Load Data</div>
                <div className='btn btn-success'onClick={saveData}>Save Data</div>
              </div>
              <p className="donasi mt-2" onClick={handleQris}>Donasi ke Developer :D</p>
              <hr></hr>
            </div>
          </div>
          <div class="scroll">
            {view && 
              <div className="qris animate"></div>
            }
            <div className="row g-2">
            <h5>Hari Kerja</h5>
              {inputFields.map((inputField, index) => (
                  <div key={index} className="col-4 mb-4 animate">
                    <h6>Hari {index+1} :</h6>
                    <input
                      className='form-control'
                      type="number"
                      placeholder={`Jam Lembur`}
                      value={inputField.value}
                      onChange={(event) => handleInputChange(index, event)}
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
            <div className="row g-2">
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
            </div>
          </div>
      </div>
    </main>
  )
}
