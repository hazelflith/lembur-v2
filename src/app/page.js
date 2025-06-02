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

  const hariKerja = {
    // First hour (0-59 minutes)
    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0,
    "15": 0.25, "16": 0.25, "17": 0.25, "18": 0.25, "19": 0.25, "20": 0.25, "21": 0.25, "22": 0.25, "23": 0.25, "24": 0.25, "25": 0.25, "26": 0.25, "27": 0.25, "28": 0.25, "29": 0.25,
    "30": 0.5, "31": 0.5, "32": 0.5, "33": 0.5, "34": 0.5, "35": 0.5, "36": 0.5, "37": 0.5, "38": 0.5, "39": 0.5, "40": 0.5, "41": 0.5, "42": 0.5, "43": 0.5, "44": 0.5,
    "45": 0.75, "46": 0.75, "47": 0.75, "48": 0.75, "49": 0.75, "50": 0.75, "51": 0.75, "52": 0.75, "53": 0.75, "54": 0.75, "55": 0.75, "56": 0.75, "57": 0.75, "58": 0.75, "59": 0.75,
    // Second hour (60-119 minutes)
    "60": 1, "61": 1, "62": 1, "63": 1, "64": 1, "65": 1, "66": 1, "67": 1, "68": 1, "69": 1, "70": 1, "71": 1, "72": 1, "73": 1, "74": 1,
    "75": 1.25, "76": 1.25, "77": 1.25, "78": 1.25, "79": 1.25, "80": 1.25, "81": 1.25, "82": 1.25, "83": 1.25, "84": 1.25, "85": 1.25, "86": 1.25, "87": 1.25, "88": 1.25, "89": 1.25,
    "90": 1.5, "91": 1.5, "92": 1.5, "93": 1.5, "94": 1.5, "95": 1.5, "96": 1.5, "97": 1.5, "98": 1.5, "99": 1.5, "100": 1.5, "101": 1.5, "102": 1.5, "103": 1.5, "104": 1.5,
    "105": 1.75, "106": 1.75, "107": 1.75, "108": 1.75, "109": 1.75, "110": 1.75, "111": 1.75, "112": 1.75, "113": 1.75, "114": 1.75, "115": 1.75, "116": 1.75, "117": 1.75, "118": 1.75, "119": 1.75,
    // Third hour (120-179 minutes)
    "120": 2, "121": 2, "122": 2, "123": 2, "124": 2, "125": 2, "126": 2, "127": 2, "128": 2, "129": 2, "130": 2, "131": 2, "132": 2, "133": 2, "134": 2,
    "135": 2.25, "136": 2.25, "137": 2.25, "138": 2.25, "139": 2.25, "140": 2.25, "141": 2.25, "142": 2.25, "143": 2.25, "144": 2.25, "145": 2.25, "146": 2.25, "147": 2.25, "148": 2.25, "149": 2.25,
    "150": 2.5, "151": 2.5, "152": 2.5, "153": 2.5, "154": 2.5, "155": 2.5, "156": 2.5, "157": 2.5, "158": 2.5, "159": 2.5, "160": 2.5, "161": 2.5, "162": 2.5, "163": 2.5, "164": 2.5,
    "165": 2.75, "166": 2.75, "167": 2.75, "168": 2.75, "169": 2.75, "170": 2.75, "171": 2.75, "172": 2.75, "173": 2.75, "174": 2.75, "175": 2.75, "176": 2.75, "177": 2.75, "178": 2.75, "179": 2.75,
    // Fourth hour (180-239 minutes)
    "180": 3, "181": 3, "182": 3, "183": 3, "184": 3, "185": 3, "186": 3, "187": 3, "188": 3, "189": 3, "190": 3, "191": 3, "192": 3, "193": 3, "194": 3,
    "195": 3.25, "196": 3.25, "197": 3.25, "198": 3.25, "199": 3.25, "200": 3.25, "201": 3.25, "202": 3.25, "203": 3.25, "204": 3.25, "205": 3.25, "206": 3.25, "207": 3.25, "208": 3.25, "209": 3.25,
    "210": 3.5, "211": 3.5, "212": 3.5, "213": 3.5, "214": 3.5, "215": 3.5, "216": 3.5, "217": 3.5, "218": 3.5, "219": 3.5, "220": 3.5, "221": 3.5, "222": 3.5, "223": 3.5, "224": 3.5,
    "225": 3.75, "226": 3.75, "227": 3.75, "228": 3.75, "229": 3.75, "230": 3.75, "231": 3.75, "232": 3.75, "233": 3.75, "234": 3.75, "235": 3.75, "236": 3.75, "237": 3.75, "238": 3.75, "239": 3.75,
    // Fifth hour (240-299 minutes)
    "240": 4, "241": 4, "242": 4, "243": 4, "244": 4, "245": 4, "246": 4, "247": 4, "248": 4, "249": 4, "250": 4, "251": 4, "252": 4, "253": 4, "254": 4,
    "255": 4.25, "256": 4.25, "257": 4.25, "258": 4.25, "259": 4.25, "260": 4.25, "261": 4.25, "262": 4.25, "263": 4.25, "264": 4.25, "265": 4.25, "266": 4.25, "267": 4.25, "268": 4.25, "269": 4.25,
    "270": 4.5, "271": 4.5, "272": 4.5, "273": 4.5, "274": 4.5, "275": 4.5, "276": 4.5, "277": 4.5, "278": 4.5, "279": 4.5, "280": 4.5, "281": 4.5, "282": 4.5, "283": 4.5, "284": 4.5,
    "285": 4.75, "286": 4.75, "287": 4.75, "288": 4.75, "289": 4.75, "290": 4.75, "291": 4.75, "292": 4.75, "293": 4.75, "294": 4.75, "295": 4.75, "296": 4.75, "297": 4.75, "298": 4.75, "299": 4.75,
    // Sixth hour (300-359 minutes)
    "300": 5, "301": 5, "302": 5, "303": 5, "304": 5, "305": 5, "306": 5, "307": 5, "308": 5, "309": 5, "310": 5, "311": 5, "312": 5, "313": 5, "314": 5,
    "315": 5.25, "316": 5.25, "317": 5.25, "318": 5.25, "319": 5.25, "320": 5.25, "321": 5.25, "322": 5.25, "323": 5.25, "324": 5.25, "325": 5.25, "326": 5.25, "327": 5.25, "328": 5.25, "329": 5.25,
    "330": 5.5, "331": 5.5, "332": 5.5, "333": 5.5, "334": 5.5, "335": 5.5, "336": 5.5, "337": 5.5, "338": 5.5, "339": 5.5, "340": 5.5, "341": 5.5, "342": 5.5, "343": 5.5, "344": 5.5,
    "345": 5.75, "346": 5.75, "347": 5.75, "348": 5.75, "349": 5.75, "350": 5.75, "351": 5.75, "352": 5.75, "353": 5.75, "354": 5.75, "355": 5.75, "356": 5.75, "357": 5.75, "358": 5.75, "359": 5.75,
    // Seventh hour (360-419 minutes)
    "360": 6, "361": 6, "362": 6, "363": 6, "364": 6, "365": 6, "366": 6, "367": 6, "368": 6, "369": 6, "370": 6, "371": 6, "372": 6, "373": 6, "374": 6,
    "375": 6.25, "376": 6.25, "377": 6.25, "378": 6.25, "379": 6.25, "380": 6.25, "381": 6.25, "382": 6.25, "383": 6.25, "384": 6.25, "385": 6.25, "386": 6.25, "387": 6.25, "388": 6.25, "389": 6.25,
    "390": 6.5, "391": 6.5, "392": 6.5, "393": 6.5, "394": 6.5, "395": 6.5, "396": 6.5, "397": 6.5, "398": 6.5, "399": 6.5, "400": 6.5, "401": 6.5, "402": 6.5, "403": 6.5, "404": 6.5,
    "405": 6.75, "406": 6.75, "407": 6.75, "408": 6.75, "409": 6.75, "410": 6.75, "411": 6.75, "412": 6.75, "413": 6.75, "414": 6.75, "415": 6.75, "416": 6.75, "417": 6.75, "418": 6.75, "419": 6.75,
    // Eighth hour (420-479 minutes)
    "420": 7, "421": 7, "422": 7, "423": 7, "424": 7, "425": 7, "426": 7, "427": 7, "428": 7, "429": 7, "430": 7, "431": 7, "432": 7, "433": 7, "434": 7,
    "435": 7.25, "436": 7.25, "437": 7.25, "438": 7.25, "439": 7.25, "440": 7.25, "441": 7.25, "442": 7.25, "443": 7.25, "444": 7.25, "445": 7.25, "446": 7.25, "447": 7.25, "448": 7.25, "449": 7.25,
    "450": 7.5, "451": 7.5, "452": 7.5, "453": 7.5, "454": 7.5, "455": 7.5, "456": 7.5, "457": 7.5, "458": 7.5, "459": 7.5, "460": 7.5, "461": 7.5, "462": 7.5, "463": 7.5, "464": 7.5,
    "465": 7.75, "466": 7.75, "467": 7.75, "468": 7.75, "469": 7.75, "470": 7.75, "471": 7.75, "472": 7.75, "473": 7.75, "474": 7.75, "475": 7.75, "476": 7.75, "477": 7.75, "478": 7.75, "479": 7.75,
    // Ninth hour (480-539 minutes)
    "480": 8, "481": 8, "482": 8, "483": 8, "484": 8, "485": 8, "486": 8, "487": 8, "488": 8, "489": 8, "490": 8, "491": 8, "492": 8, "493": 8, "494": 8,
    "495": 8.25, "496": 8.25, "497": 8.25, "498": 8.25, "499": 8.25, "500": 8.25, "501": 8.25, "502": 8.25, "503": 8.25, "504": 8.25, "505": 8.25, "506": 8.25, "507": 8.25, "508": 8.25, "509": 8.25,
    "510": 8.5, "511": 8.5, "512": 8.5, "513": 8.5, "514": 8.5, "515": 8.5, "516": 8.5, "517": 8.5, "518": 8.5, "519": 8.5, "520": 8.5, "521": 8.5, "522": 8.5, "523": 8.5, "524": 8.5,
    "525": 8.75, "526": 8.75, "527": 8.75, "528": 8.75, "529": 8.75, "530": 8.75, "531": 8.75, "532": 8.75, "533": 8.75, "534": 8.75, "535": 8.75, "536": 8.75, "537": 8.75, "538": 8.75, "539": 8.75,
    // Tenth hour (540-599 minutes)
    "540": 9, "541": 9, "542": 9, "543": 9, "544": 9, "545": 9, "546": 9, "547": 9, "548": 9, "549": 9, "550": 9, "551": 9, "552": 9, "553": 9, "554": 9,
    "555": 9.25, "556": 9.25, "557": 9.25, "558": 9.25, "559": 9.25, "560": 9.25, "561": 9.25, "562": 9.25, "563": 9.25, "564": 9.25, "565": 9.25, "566": 9.25, "567": 9.25, "568": 9.25, "569": 9.25,
    "570": 9.5, "571": 9.5, "572": 9.5, "573": 9.5, "574": 9.5, "575": 9.5, "576": 9.5, "577": 9.5, "578": 9.5, "579": 9.5, "580": 9.5, "581": 9.5, "582": 9.5, "583": 9.5, "584": 9.5,
    "585": 9.75, "586": 9.75, "587": 9.75, "588": 9.75, "589": 9.75, "590": 9.75, "591": 9.75, "592": 9.75, "593": 9.75, "594": 9.75, "595": 9.75, "596": 9.75, "597": 9.75, "598": 9.75, "599": 9.75,
    // Eleventh hour (600-659 minutes)
    "600": 10, "601": 10, "602": 10, "603": 10, "604": 10, "605": 10, "606": 10, "607": 10, "608": 10, "609": 10, "610": 10, "611": 10, "612": 10, "613": 10, "614": 10,
    "615": 10.25, "616": 10.25, "617": 10.25, "618": 10.25, "619": 10.25, "620": 10.25, "621": 10.25, "622": 10.25, "623": 10.25, "624": 10.25, "625": 10.25, "626": 10.25, "627": 10.25, "628": 10.25, "629": 10.25,
    "630": 10.5, "631": 10.5, "632": 10.5, "633": 10.5, "634": 10.5, "635": 10.5, "636": 10.5, "637": 10.5, "638": 10.5, "639": 10.5, "640": 10.5, "641": 10.5, "642": 10.5, "643": 10.5, "644": 10.5,
    "645": 10.75, "646": 10.75, "647": 10.75, "648": 10.75, "649": 10.75, "650": 10.75, "651": 10.75, "652": 10.75, "653": 10.75, "654": 10.75, "655": 10.75, "656": 10.75, "657": 10.75, "658": 10.75, "659": 10.75,
    // Twelfth hour (660-719 minutes)
    "660": 11, "661": 11, "662": 11, "663": 11, "664": 11, "665": 11, "666": 11, "667": 11, "668": 11, "669": 11, "670": 11, "671": 11, "672": 11, "673": 11, "674": 11,
    "675": 11.25, "676": 11.25, "677": 11.25, "678": 11.25, "679": 11.25, "680": 11.25, "681": 11.25, "682": 11.25, "683": 11.25, "684": 11.25, "685": 11.25, "686": 11.25, "687": 11.25, "688": 11.25, "689": 11.25,
    "690": 11.5, "691": 11.5, "692": 11.5, "693": 11.5, "694": 11.5, "695": 11.5, "696": 11.5, "697": 11.5, "698": 11.5, "699": 11.5, "700": 11.5, "701": 11.5, "702": 11.5, "703": 11.5, "704": 11.5,
    "705": 11.75, "706": 11.75, "707": 11.75, "708": 11.75, "709": 11.75, "710": 11.75, "711": 11.75, "712": 11.75, "713": 11.75, "714": 11.75, "715": 11.75, "716": 11.75, "717": 11.75, "718": 11.75, "719": 11.75,
    // Maximum value (720 minutes = 12 hours)
    "720": 12
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
      
      // Split the input into hours and minutes
      const [hours, minutes] = inputValue.split('.').map(Number);
      
      // Calculate total minutes
      let totalMinutes = 0;
      if (!isNaN(hours)) {
        totalMinutes += hours * 60;
      }
      if (!isNaN(minutes)) {
        // If minutes part is less than 60, add it directly
        if (minutes < 60) {
          totalMinutes += minutes;
        } else {
          // If minutes part is 60 or more, convert it to hours and minutes
          const additionalHours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          totalMinutes += (additionalHours * 60) + remainingMinutes;
        }
      }

      // Check if total hours is within limit (24 hours = 1440 minutes)
      if (totalMinutes <= 1440) {
        newInputFields[index].value = totalMinutes;
      } else {
        event.target.value = 1440;
        newInputFields[index].value = 1440;
      }
      
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
    temp = hariLemburKerja + hariLemburLibur
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
  
  return (
    <main>
      <div className="container mw-425 pb-5">
        {totalLembur > 3000000 && <div class="money"></div>}
          <div className="navbar fixed-top mw-425 mx-auto px-2 pb-0">
            <div class="">
              <div className="d-flex py-3 pb-2">
                <h1>Lembur Calc v4 (Quantum)</h1>
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
                  <h6>Total Menit Lembur :</h6>
                  <div class="d-flex">
                    <div class="harilembur me-1"></div>
                    Menit
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className='btn btn-danger me-2' onClick={loadData}>Load Data</div>
                <div className='btn btn-success'onClick={saveData}>Save Data</div>
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
