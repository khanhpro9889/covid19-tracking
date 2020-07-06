import React, {useState, useEffect} from 'react';
import './App.css';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';
import Records from './Components/Records';
import {Container, Row, Col} from 'reactstrap';
import TableRecords from './Components/TableRecords';
import axios from 'axios';
import Diagram from './Components/Diagram'
const BoxImg = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  text-align: center;
  margin-bottom: 50px;
  z-index:1000;
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
  position: relative
`

const SearchBar = styled.input`
  width: 100%;
  border-radius: 30px;
  padding: 10px 10px;
  font-size: 22px;
  padding-left: 55px;
  padding-right: 55px;
  border: 1px solid silver;
  box-shadow: 5px 5px 10px silver;
  ${({ active }) => active && `
    border-radius: 0px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  `}
`

const CenterDiv = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  margin-bottom: 30px;
  margin-top: -90px;
  z-index: 1000;
`

const IconParents = styled.div`
  position: absolute;
  left: 10px;
  top: 13px;
`
const IconParents1 = styled.div`
  position: absolute;
  right: 10px;
  top: 13px;
  cursor: pointer;
`
const SearchResult = styled.div`
  border: 1px solid gray;
  position: absolute;
  top: 100%;
  width: 100%;
  border-radius: 30px;
  background-color: white;
  z-index: 30;
  ${({ active }) => active && `
    border-radius: 0px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 1px solid silver;
  `}
`
const Ul = styled.ul`
  margin-bottom: 0px;
  position: relative;
  z-index: 1000;
  & li:last-child{
    border-bottom: none;
  }
  & li:last-child:hover {
    background: silver;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`
const Li = styled.li`
  text-align: left;
  padding: 10px 15px;
  font-size: 20px;
  list-style-type: none;
  cursor: pointer;
  border-bottom: 1px solid silver;
  &:hover{
    background: silver;
  }
`

const ItemSearch = styled.span`
  &:hover {
    background: gray;
    
  }
`
const Box = styled.div`
    padding: 16px;
    border: 1px solid silver;
    border-radius: 8px;
    margin-bottom: 32px;
    z-index: -1;
    position: relative;
`
const Title1 = styled.h3`
    font-size: 1.375rem;
    font-weight: 400;
    color: #202124;
    padding-bottom: 8px;
`
const SubTitle1 = styled.div`
  font-size: 1.375rem;
  font-weight: bold;
  color: #202124;
  margin-bottom: 4px;
  margin-top: 16px;
`
const Content = styled.div`
font-size: 1rem;
font-weight: 500;
color: #202124;
margin-bottom: 4px;
`

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function App() {
  const [data, setData] = useState({});
  const [global, setGlobal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [active, setActive] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [findedCountry, setFindedCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [dataCountry, setDataCountry] = useState([]);
  const [nameSelectedCountry, setNameSelectedCountry] = useState('Toan the gioi');
  const [activeWhenClick, setActiveWhenClick] = useState(false);
  const [lastFindedCountry, setLastFindedCountry] = useState([]);
  const [nameTemp, setNameTemp] = useState('');

  const getDataGlobal = async () => {
    setIsLoading1(true);
    const response = await axios.get('https://api.covid19api.com/summary');
    console.log("getData -> response", response)
    const global = response.data.Global;
    const totalConfirmed = numberWithCommas(global.TotalConfirmed);
    const totalRecovered = numberWithCommas(global.TotalRecovered);
    const totalDeaths = numberWithCommas(global.TotalDeaths);

    const listCountry = response.data.Countries;

    listCountry.sort((a, b) => {
      if(a.TotalConfirmed > b.TotalConfirmed) return -1;
      if(a.TotalConfirmed < b.TotalConfirmed) return 1;
      return 0;
    })

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
      listCountry: listCountry1,
      listCountryBeforeCommas: listCountry
    })
    setIsLoading1(false);
  }

  const sort = (sort1, sort2, sort3, isDecrease) => {
    var listCountry2 = global.listCountryBeforeCommas;
  
    if(sort1 === true) {
      if(isDecrease === true) {
        listCountry2.sort((a, b) => {
          if(a.TotalConfirmed > b.TotalConfirmed) return -1;
          if(a.TotalConfirmed < b.TotalConfirmed) return 1;
          return 0;
        })
      }else {
        listCountry2.sort((a, b) => {
          if(a.TotalConfirmed < b.TotalConfirmed) return -1;
          if(a.TotalConfirmed > b.TotalConfirmed) return 1;
          return 0;
        })
      }
      
    }

    if(sort2 === true) {
      console.log("aaa");
      if(isDecrease === true) {
        listCountry2.sort((a, b) => {
          if(a.TotalRecovered > b.TotalRecovered) return -1;
          if(a.TotalRecovered < b.TotalRecovered) return 1;
          return 0;
        })
      }else {
        listCountry2.sort((a, b) => {
          if(a.TotalRecovered < b.TotalRecovered) return -1;
          if(a.TotalRecovered > b.TotalRecovered) return 1;
          return 0;
        })
      }
     
    }

    if(sort3 === true) {
      if(isDecrease) {
        listCountry2.sort((a, b) => {
          if(a.TotalDeaths > b.TotalDeaths) return -1;
          if(a.TotalDeaths < b.TotalDeaths) return 1;
          return 0;
        })
      }else{
        listCountry2.sort((a, b) => {
          if(a.TotalDeaths < b.TotalDeaths) return -1;
          if(a.TotalDeaths > b.TotalDeaths) return 1;
          return 0;
        })
      }
    }
    const listCountry1 = listCountry2.map(item => {
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
    setGlobal({...global, listCountry: listCountry1})
  }

  const getDataByCountry = async (country = -1) => {
    var totalConfirmed;
    var totalDeaths;
    var totalRecovered;
    setIsLoading(true);
    if(country === -1) {
      setNameSelectedCountry('Toan the gioi');
      const response = await axios.get('https://api.covid19api.com/world/total');
      setIsLoading(false);
      totalConfirmed = numberWithCommas(response.data.TotalConfirmed);
      totalRecovered = numberWithCommas(response.data.TotalRecovered);
      totalDeaths = numberWithCommas(response.data.TotalDeaths);
      setSelectedCountry({Country: 'Toàn thế giới'});
    } else {
      if(country.Country === 'Toan the gioi') {
        setNameSelectedCountry('Toan the gioi');
        const response = await axios.get('https://api.covid19api.com/world/total');
        setIsLoading(false);
        totalConfirmed = numberWithCommas(response.data.TotalConfirmed);
        totalRecovered = numberWithCommas(response.data.TotalRecovered);
        totalDeaths = numberWithCommas(response.data.TotalDeaths);
        setSelectedCountry({Country: 'Toàn thế giới'});
      } else {
        setNameSelectedCountry(country.Country);
        setSelectedCountry(country);
        if(country.ISO2 !== 'vn') {
          setLastFindedCountry([{Country: 'Toan the gioi', ISO2: 'WORLD'}, {Country: 'Viet Nam', ISO2: 'vn'}, country]);
        }
        
        const response = await axios.get(`https://api.covid19api.com/country/${country.Slug}`);
        setIsLoading(false);
        const length = response.data.length;
        var arrDate = [];
        var arrConfirmed = [];
        response.data.forEach(item => {
          arrConfirmed = [...arrConfirmed, item.Confirmed];
          arrDate = [...arrDate, `${new Date(item.Date).getDate()}/${new Date(item.Date).getMonth()}/${new Date(item.Date).getFullYear()}`];
          
        })
        setDataCountry({arrDate: arrDate, arrConfirmed: arrConfirmed});
        try{
          totalConfirmed = numberWithCommas(response.data[length - 1].Confirmed);
          totalRecovered = numberWithCommas(response.data[length - 1].Recovered);
          totalDeaths = numberWithCommas(response.data[length - 1].Deaths);
        } catch (err){
          totalConfirmed = totalRecovered = totalDeaths = 'Không có dữ liệu';
        }
      }
    }
    setData({
      totalConfirmed: totalConfirmed,
      totalRecovered: totalRecovered,
      totalDeaths: totalDeaths
    })
    setFindedCountry([]);
    setActiveWhenClick(false);
    setActive(false);
  }
  const getAllCountries = async () => {
    const countryList = await axios.get('https://api.covid19api.com/countries');
    setCountryList(countryList.data);
  }

  const searchCountry = (contentSearch) => {
    const regex = new RegExp(`(\w)*${contentSearch}(\w)*`, "gi");
    const findedCountry1 = countryList.filter(item => regex.test(item.Country));
    setFindedCountry(findedCountry1);
    if(findedCountry1.length !== 0) {
      setActive(true);
      setActiveWhenClick(true);
    } else {
      setFindedCountry([]);
    }
  }

  useEffect(() => {
    setLastFindedCountry([{Country: 'Toan the gioi', ISO2: 'WORLD'}, {Country: 'Viet Nam', Slug: 'Vietnam', ISO2: 'vn'}]);
    getDataGlobal();
    getDataByCountry();
    getAllCountries();
  }, []);

  return (
    <div className="App">
        <BoxImg>
          <Img src="https://www.arcgis.com/sharing/rest/content/items/f99dd40c7e084ec19df7affc91efb95c/resources/1583160722087.jpeg?w=3507"></Img>
          <Title>Virus corona (Covid 19)</Title>
          
        </BoxImg>
        <CenterDiv>
            <SearchBarParent>
              <SearchBar value={nameSelectedCountry} active={active} onChange={(e) => {
                setNameSelectedCountry(e.target.value);
                if(e.target.value.length < 3) {
                  setFindedCountry([]);
                  return;
                }
                searchCountry(e.target.value);
              }} onFocus={() => {
                setNameTemp(nameSelectedCountry);
                setNameSelectedCountry('');
                console.log(lastFindedCountry);
                setActive(true);
                setActiveWhenClick(true);     
              }}/>
              <IconParents><Icon name="search" size="big" /></IconParents>
              { activeWhenClick && <IconParents1 onClick={() => {
                console.log(nameSelectedCountry);
                setActiveWhenClick(false);
                setActive(false);
                setNameSelectedCountry(nameTemp);
              }}><Icon name="close" size="big" /></IconParents1>}
              {activeWhenClick ? 
              (<SearchResult active={active}>
                {(findedCountry.length !== 0 ) ? <Ul>
                  {findedCountry.map(i => {return {...i, IS02: i.ISO2.toLowerCase()}}).map(item => {
                    return (
                      <Li onClick={() => getDataByCountry(item)} key={item.IS02}>
                        <img src={`https://www.countryflags.io/${item.IS02.toLowerCase()}/flat/32.png`}/> {item.Country}
                      </Li>
                    )
                  })}
                </Ul> :
                <Ul active={active}>
                  {lastFindedCountry.map(i => {return {...i, IS02: i.ISO2.toLowerCase()}}).map(item => {
                    return (
                      <Li onClick={() => getDataByCountry(item)} key={item.IS02}>
                        {(!(item.IS02 === 'world')) ? (<img src={`https://www.countryflags.io/${item.IS02.toLowerCase()}/flat/32.png`}/>) : <Icon name="world"/>} {item.Country}
                      </Li>
                    )
                  })}
                </Ul>}
               </SearchResult>
              ) : ''
              }
            </SearchBarParent>
          </CenterDiv>
        <Container>
          <Row>
            <Col className="indexing" md={8}>
              <Records isLoading={isLoading} countryName={selectedCountry.Country} data={data} />
              <TableRecords sort={sort} isLoading={isLoading1} global={global} />
              <Diagram countryName={selectedCountry.Country} data={dataCountry} isLoading={isLoading}></Diagram>
              <Box>
                <Title1>Thông tin về dữ liệu này</Title1>
                <SubTitle1>Dữ liệu thực tế có thể liên tục thay đổi</SubTitle1>
                <Content>Dữ liệu này liên tục thay đổi, nên số ca nhiễm mới có thể không được cập nhật kịp thời.</Content>
                <SubTitle1>Số liệu thống kê chỉ bao gồm những người được xét nghiệm</SubTitle1>
                <Content>Số liệu này cho thấy số người có kết quả xét nghiệm dương tính. Quy định và khả năng thực hiện xét nghiệm có thể khác nhau tùy từng quốc gia. Một số khu vực có thể không có dữ liệu vì chưa công bố dữ liệu hoặc chưa cập nhật dữ liệu gần đây.</Content>
                <SubTitle1>Tại sao dữ liệu ở mỗi nguồn lại khác nhau?</SubTitle1>
                <Content>Có nhiều nguồn đang theo dõi và tổng hợp dữ liệu về vi-rút corona. Họ cập nhật dữ liệu ở những thời điểm khác nhau và có thể áp dụng những cách thức riêng biệt để thu thập dữ liệu.</Content>
              </Box>
              
            </Col>
            <Col md={4}>
              
            </Col>
          </Row>
        </Container>
        
    </div>
  );
}

export default App;
