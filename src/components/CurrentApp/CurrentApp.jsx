import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CurrentApp.css'


const CurrentApp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [dataNoValues, setDataNoValues] = useState([])
  const [search, setSearch] = useState('')
  const [sortR, setSortR] = useState('')
  const [sortU, setSortU] = useState('')
  const [sortE, setSortE] = useState('')
  const [sortK, setSortK] = useState('')
  
  const token = '5mAdqwNSvYajMzJnuTQjImo273qa0c4vFazXDbNaa7ae59b7'

  
  const getCourse = async () => {
    setIsLoading(true)
    try{
      const response = await axios.get('https://data.fx.kg/api/v1/current', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(response.data);
      setData(response.data)

      let filterNames = response.data
      filterNames = filterNames.filter((item) => item.rates.length > 0)
      
      setData(filterNames)
      console.log(filterNames);
      

      let noValue = response.data
      noValue = noValue.filter((item) => {
        return (
          item.rates.length === 0
        )
      }) 

      noValue =  noValue.filter((item) => {
        return(
          item.id < 100
        )
      })

      setDataNoValues(noValue)
      console.log(noValue);

    }
    catch(e) {
      console.log(e);
    }
    finally{
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getCourse()
  }, [])


  return (
    <div className='current-page'>
        <h1>Exchange Rates</h1>
        <a href="/"><input className='back btn' type="button" value='На главную' /></a>
        <div className="search-div">
          <input className='money-search' type="text" placeholder='Поиск банка' onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="input-money">
        </div>
        {isLoading ? <div></div> : <div className='select-div'>
          <select className='select-value' onChange={(e) => setSortR(e.target.value)} name="" id="">
            <option  value="lessR">Рубль ⬇</option>
            <option value="moreR">Рубль ⬆</option>
          </select>
          <select className='select-value' onChange={(e) => setSortU(e.target.value)} name="" id="">
            <option value="lessU">Доллар ⬇</option>
            <option value="moreU">Доллар ⬆</option>
          </select>
          <select className='select-value' onChange={(e) => setSortE(e.target.value)} name="" id="">
            <option value="lessE">Евро ⬇</option>
            <option value="moreE">Евро ⬆</option>
          </select>
          <select className='select-value' onChange={(e) => setSortK(e.target.value)} name="" id="">
            <option value="lessK">Тенге ⬇</option>
            <option value="moreK">Тенге ⬆</option>
          </select>
        </div>}
        {isLoading ? <div className='loading'>Loading...</div> : <div>{data.sort((a, b) => {
          return(
            sortR === 'moreR' ? b.rates[0].buy_rub - a.rates[0].buy_rub : sortR === 'lessR' ? a.rates[0].buy_rub - b.rates[0].buy_rub : ''
          )
        }).sort((a, b) => {
          return(
            sortU === 'moreU' ? b.rates[0].buy_usd - a.rates[0].buy_usd : sortU === 'lessU' ? a.rates[0].buy_usd - b.rates[0].buy_usd : ''
          )
        }).sort((a, b) => {
          return(
            sortE === 'moreE' ? b.rates[0].buy_eur - a.rates[0].buy_eur : sortE === 'lessE' ? a.rates[0].buy_eur - b.rates[0].buy_eur : ''
          )
        }).sort((a, b) => {
          return(
            sortK === 'moreK' ? b.rates[0].buy_kzt - a.rates[0].buy_kzt : sortK === 'lessK' ? a.rates[0].buy_kzt - b.rates[0].buy_kzt : ''
          )
        }).filter((item) => {
          return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
        }).map((item, idx) => {
        
            return (
            <div key={idx} className='money-value'> 
            <div className='value-each'>
              {item.title}
            </div>
            <div className='value-each'>
              <h4 className='h4-value-have'>Рубль</h4>
              {item.rates[0].buy_rub} с
              <div className='space'></div>
            </div>
            <div className='value-each'>
              <h4 className='h4-value-have'>Доллар</h4>
              {item.rates[0].buy_usd} с
              <div className='space'></div>
            </div>
            <div className='value-each euro'>
              <h4 className='h4-value-have'>Евро</h4>
              {item.rates[0].buy_eur} с
              <div className='space'></div>
            </div>
            <div className='value-each tenge'>
              <h4 className='h4-value-have'>Тенге</h4>
              {item.rates[0].buy_kzt} с
              <div className='space'></div>
            </div>
            </div>
            )
          
        })}</div>}


        {isLoading ? <div></div> : <div>{dataNoValues.filter((item) => {
          return(
            search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
          )
        }).map((item, idx) => {
          return(
            <div key={idx}>
              <div key={idx} className='money-value'> 
                <div className='value-each'>
                  {item.title}
                </div>
                <div className='value-each'>
                  <h4 className='h4-value-no'>Валют нет</h4>
                </div>
                <div className='value-each'>
                  <h4 className='h4-value-no'>Валют нет</h4>
                </div>
                <div className='value-each'>
                  <h4 className='h4-value-no'>Валют нет</h4>
                </div>
                <div className='value-each'>
                  <h4 className='h4-value-no'>Валют нет</h4>
                </div>
                </div>
            </div>
          )
          
        })}</div> }
        
        
    </div>
  )
}

export default CurrentApp




