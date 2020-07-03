import React, {useState, useEffect} from 'react';
import './App.css';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';
import Records from './Components/Records';
import {Container, Row, Col} from 'reactstrap';
import TableRecords from './Components/TableRecords';
import axios from 'axios';

const BoxImg = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  text-align: center;
  margin-bottom: 50px;
`
const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`
const Title = styled.div`
  position: absolute;
  color: white;
  z-index: 2;
  bottom: 60px;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 2px;
  
`
const SearchBarParent = styled.div`
  width: 40%;
  height: 50px;
  position: relative;
`

const SearchBar = styled.input`
  width: 100%;
  border-radius: 30px;
  padding: 10px 15px;
  font-size: 22px;
  padding-left: 55px;
  border: 1px solid silver;
  box-shadow: 5px 5px 10px silver;
`

const CenterDiv = styled.div`
  position: absolute;
  width: 100%;
  bottom: -35px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconParents = styled.div`
  position: absolute;
  left: 10px;
  top: 13px;
`

const SearchResult = styled.div`
  border: 1px solid gray;
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100px;
  border-radius: 30px;
  display: none;
  background: white;
`
function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function App() {
  const [data, setData] = useState({});
  const [global, setGlobal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const getDataGlobal = async (sort1, sort2, sort3, isDecrease) => {
    setIsLoading1(true);
    const response = await axios.get('https://api.covid19api.com/summary');
    console.log("getData -> response", response)
    const global = response.data.Global;
    const totalConfirmed = numberWithCommas(global.TotalConfirmed);
    const totalRecovered = numberWithCommas(global.TotalRecovered);
    const totalDeaths = numberWithCommas(global.TotalDeaths);

    const listCountry = response.data.Countries;

    if(sort1 === true) {
      if(isDecrease === true) {
        listCountry.sort((a, b) => {
          if(a.TotalConfirmed > b.TotalConfirmed) return -1;
          if(a.TotalConfirmed < b.TotalConfirmed) return 1;
          return 0;
        })
      }else {
        listCountry.sort((a, b) => {
          if(a.TotalConfirmed < b.TotalConfirmed) return -1;
          if(a.TotalConfirmed > b.TotalConfirmed) return 1;
          return 0;
        })
      }
      
    }

    if(sort2 === true) {
      if(isDecrease === true) {
        listCountry.sort((a, b) => {
          if(a.TotalRecovered > b.TotalRecovered) return -1;
          if(a.TotalRecovered < b.TotalRecovered) return 1;
          return 0;
        })
      }else {
        listCountry.sort((a, b) => {
          if(a.TotalRecovered < b.TotalRecovered) return -1;
          if(a.TotalRecovered > b.TotalRecovered) return 1;
          return 0;
        })
      }
     
    }

    if(sort3 === true) {
      if(isDecrease) {
        listCountry.sort((a, b) => {
          if(a.TotalDeaths > b.TotalDeaths) return -1;
          if(a.TotalDeaths < b.TotalDeaths) return 1;
          return 0;
        })
      }else{
        listCountry.sort((a, b) => {
          if(a.TotalDeaths < b.TotalDeaths) return -1;
          if(a.TotalDeaths > b.TotalDeaths) return 1;
          return 0;
        })
      }
      
    }

    const listCountry1 = listCountry.map(item => {
      return {
        ...item,
        NewConfirmed: numberWithCommas(item.NewConfirmed),
        TotalConfirmed: numberWithCommas(item.TotalConfirmed),
        NewDeaths: numberWithCommas(item.NewDeaths),
        TotalDeaths: numberWithCommas(item.TotalDeaths),
        NewRecovered: numberWithCommas(item.NewRecovered),
        TotalRecovered: numberWithCommas(item.TotalRecovered)
      }
    })

    setGlobal({
      totalConfirmed: totalConfirmed,
      totalRecovered: totalRecovered,
      totalDeaths: totalDeaths,
      listCountry: listCountry1
    })
    setIsLoading1(false);
  }

  const getDataByCountry = async (name = -1) => {
    setIsLoading(true);
    if(name === -1) {
      const response = await axios.get('https://api.covid19api.com/world/total');
      setIsLoading(false);
      const totalConfirmed = numberWithCommas(response.data.TotalConfirmed);
      const totalRecovered = numberWithCommas(response.data.TotalRecovered);
      const totalDeaths = numberWithCommas(response.data.TotalDeaths);
      
      setData({
        totalConfirmed: totalConfirmed,
        totalRecovered: totalRecovered,
        totalDeaths: totalDeaths
      })
    }
    
  }
  const getAllCountries = async () => {
    const countryList = await axios.get('https://api.covid19api.com/countries');
    setCountryList(countryList.data);
    console.log("getAllCountries -> countryList.data", countryList.data)
  }

  const searchCountry = (content) => {
    const findedCountry = listCountry.find(item => item.Country === )
  }

  useEffect(() => {
    getAllCountries();
  }, [])
  useEffect(() => {
    getDataGlobal(true, false, false, true);
    getDataByCountry();
  }, []);

  return (
    <div className="App">
        <BoxImg>
          <Img src="https://www.sciencealert.com/images/2020-04/processed/earthmovement_1024.jpg"></Img>
          <Title>Virus corona (Covid 19)</Title>
          <CenterDiv>
            <SearchBarParent>
              <SearchBar />
              <IconParents><Icon name="search" size="big" color="gray" onChange={(e) => {
                if(e.target.value.length < 3) {
                  return;
                }
                searchCountry(e.target.value);
              }}/></IconParents>
              <SearchResult></SearchResult>
            </SearchBarParent>
          </CenterDiv>
        </BoxImg>
        <Container>
          <Row>
            <Col md="8">
              <Records isLoading={isLoading} data={data} />
              <TableRecords sort={getDataGlobal} isLoading={isLoading1} global={global} />
            </Col>
            <Col md="4">
              
            </Col>
          </Row>
        </Container>
        
    </div>
  );
}

export default App;
