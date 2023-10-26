'use client'
import Image from 'next/image'
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';

export default function Home() {

  const [gajiPokok, setGajiPokok] = useState()
  const [view, setView] = useState(false)
  const [totalLembur, setTotalLembur] = useState()
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  const [inputFieldsLibur, setInputFieldsLibur] = useState([]);
  const [tarifLembur, setTarifLembur ] = useState(0)

  const [lemburLibur, setLemburLibur] = useState(0)
  const [lemburKerja, setLemburKerja] = useState(0)


  const handlerTarif = (value) => {
    setGajiPokok(value);
    setTarifLembur((1 / 173) * 0.57 * value)
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
    setLemburKerja(Math.round(totalLemburHariKerja))
}


const calculateLemburHariLibur = () => { 
    let totalLemburHariLibur = 0

    inputFieldsLibur.forEach((data)=>{
      if(data.value){
        totalLemburHariLibur += hariLibur[data.value.toString()] *  tarifLembur
      }     
    })

    setLemburLibur(Math.round(totalLemburHariLibur))
}


  const handleAddInput = () => {
    const newInputFields = [...inputFields, { value: '' }];
    setInputFields(newInputFields);
  };
  
  const handleCountLemburKerja = () => {
    calculateLemburHariKerja()
  }
  const handleCountLemburLibur = () => {
    calculateLemburHariLibur()
  }

  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index].value = event.target.value;
    setInputFields(newInputFields);
    handleCountLemburKerja()
  };

  


  const handleAddInputLibur = () => {
    const newInputFieldsLibur = [...inputFieldsLibur, { value: '' }];
    setInputFieldsLibur(newInputFieldsLibur);
  };

  const calculateTotalLembur = () =>{
    setTotalLembur(lemburKerja + lemburLibur)
  }

  const handleInputChangeLibur = (index, event) => {
    const newInputFieldsLibur = [...inputFieldsLibur];
    newInputFieldsLibur[index].value = event.target.value;
    setInputFieldsLibur(newInputFieldsLibur);
    handleCountLemburLibur()
  };
  const saveData = () =>{
    localStorage.setItem('gajiPokok', gajiPokok)
    localStorage.setItem('totalLembur', totalLembur)
    localStorage.setItem('inputFields', JSON.stringify(inputFields))
    localStorage.setItem('inputFieldsLibur', JSON.stringify(inputFieldsLibur))
    localStorage.setItem('tarifLembur', tarifLembur)
    localStorage.setItem('lemburLibur', lemburLibur)
    localStorage.setItem('lemburKerja', lemburKerja)
  }
  const loadData = () => {
    const gaji = localStorage.getItem('gajiPokok')
    const total = localStorage.getItem('totalLembur')
    const tarif = localStorage.getItem('tarifLembur')
    const dataLibur = localStorage.getItem('lemburLibur')
    const dataKerja = localStorage.getItem('lemburKerja')
    const dataLemburKerja = localStorage.getItem('inputFields')
    const dataLemburLibur = localStorage.getItem('inputFieldsLibur')
    const dataLemburKerjaParsed = JSON.parse(dataLemburKerja)
    const dataLemburLiburParsed = JSON.parse(dataLemburLibur)
    setGajiPokok(gaji)
    setTotalLembur(total)
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
      <div class="container mw-425">
        <div class="py-3">
          <h1>Lembur Calc 2.0</h1>
        </div>
        <form>
          <div class="mb-4">
            <h6>Gaji Pokok :</h6>
            <CurrencyFormat value={gajiPokok} thousandSeparator={'.'} prefix={'Rp.'} decimalSeparator=','  className='mb-2 ms-2 form-control'
              onChange={(event)=>handlerTarif(event.target.value)}
              placeholder= "Jumlah Gaji Pokok"
            />
          </div>
          <div class="d-flex align-items-center">
            <h6>Total Lembur Anda :</h6>
            <CurrencyFormat value={totalLembur} displayType={'text'} thousandSeparator={'.'} prefix={'Rp.'} decimalSeparator=','  className='mb-2 ms-2'/>
            <div className='btn btn-primary ms-auto' onClick={calculateTotalLembur}>Hitung</div>
          </div>
          <div class="d-flex">
            <div className='btn btn-danger me-2' onClick={loadData}>Load Data</div>
            <div className='btn btn-success'onClick={saveData}>Save Data</div>
          </div>
          <p className="donasi mt-2" onClick={handleQris}>Donasi ke Developer :D</p>
          {view && 
            <div class="qris"></div>
          }
          <hr></hr>
          {inputFields.map((inputField, index) => (
            <div key={index} class="mb-4">
              <h6>Hari kerja ke {index+1} :</h6>
              <input
                className='form-control'
                type="number"
                placeholder={`Jam Lembur`}
                value={inputField.value}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          ))}
          <div class="btn btn-primary mb-2" onClick={handleAddInput}>
              Tambah Hari
          </div>
          <hr className='mb-4'></hr>
          {inputFieldsLibur.map((inputFieldLibur, index) => (
            <div key={index} class="mb-4">
              <h6>Hari libur ke {index+1} :</h6>
              <input
                type="number"
                className='form-control'
                placeholder="Jam Lembur"
                value={inputFieldLibur.value}
                onChange={(event) => handleInputChangeLibur(index, event)}
              />
            </div>
          ))}
          <div class="btn btn-primary" onClick={handleAddInputLibur}>
              Tambah Hari Libur
          </div>
      </form>
      </div>
    </main>
  )
}
