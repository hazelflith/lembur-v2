'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';

export default function Home() {

  const [gajiPokok, setGajiPokok] = useState()
  const [gajiPokokShow, setGajiPokokShow] = useState()
  const [view, setView] = useState(false)
  const [temp, setTemp] = useState(0)
  const [totalLembur, setTotalLembur] = useState()
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  const [inputFieldsLibur, setInputFieldsLibur] = useState([]);
  const [tarifLembur, setTarifLembur ] = useState(0)

  const [lemburLibur, setLemburLibur] = useState(0)
  const [lemburKerja, setLemburKerja] = useState(0)


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
    handleCountLemburKerja()
  };

  


  const handleAddInputLibur = () => {
    const newInputFieldsLibur = [...inputFieldsLibur, { value: '' }];
    setInputFieldsLibur(newInputFieldsLibur);
  };
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

  const handleInputChangeLibur = (index, event) => {
    const newInputFieldsLibur = [...inputFieldsLibur];
    if(event.target.value <= 24){
      newInputFieldsLibur[index].value = event.target.value;
    }
    else{
      event.target.value = 24
      newInputFieldsLibur[index].value = event.target.value;
    }
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

  const handleQris = () => {
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
        <div className="py-3">
          <h1>Lembur Calc 2.0</h1>
        </div>
        <form>
          <div className="mb-4">
            <h6>Gaji Pokok :</h6>
            <CurrencyFormat value={gajiPokokShow} thousandSeparator={'.'} prefix={'Rp.'} decimalSeparator=','  className='mb-2 form-control'
              onChange={(event)=>handlerTarif(event.target.value)}
              placeholder= "Jumlah Gaji Pokok"
            />
          </div>
          <div className="d-flex align-items-center">
            <div className='mb-2'>
              <h6>Total Lembur Anda :</h6>
              <CurrencyFormat value={totalLembur} displayType={'text'} thousandSeparator={'.'} prefix={'Rp.'} decimalSeparator=','/>
            </div>
          </div>
          <div className="d-flex">
            <div className='btn btn-danger me-2' onClick={loadData}>Load Data</div>
            <div className='btn btn-success'onClick={saveData}>Save Data</div>
          </div>
          <p className="donasi mt-2" onClick={handleQris}>Donasi ke Developer :D</p>
          {view && 
            <div className="qris"></div>
          }
          <hr></hr>
          <div className="row g-2">
            <h5>Hari Kerja</h5>
            {inputFields.map((inputField, index) => (
              <div key={index} className="col-4 mb-4">
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
          </div>
          <div className="btn btn-primary mb-2" onClick={handleAddInput}>
              Tambah Hari
          </div>
          <hr className='mb-4'></hr>
          <div className="row g-2">
            {inputFieldsLibur.length > 0 && <h5>Hari Libur</h5>}
            {inputFieldsLibur.map((inputFieldLibur, index) => (
              <div key={index} className="col-4 mb-4">
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
          </div>
          <div className="btn btn-primary" onClick={handleAddInputLibur}>
              Tambah Hari Libur
          </div>
      </form>
      </div>
    </main>
  )
}
