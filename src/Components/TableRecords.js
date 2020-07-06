import React, {useState} from 'react';
import {StickyTable, Row, Cell} from 'react-sticky-table';
import {Dimmer, Loader, Segment, Icon} from 'semantic-ui-react';
import styled from 'styled-components';
const Box = styled.div`
    padding: 16px;
    border: 1px solid silver;
    border-radius: 8px;
    margin-bottom: 32px;
    position: relative;
`
const Title = styled.h3`
    font-size: 1.375rem;
    font-weight: 400;
    color: #202124;
    padding-bottom: 8px;
    margin-bottom: 16px;
`
const Bottom = styled.span`
    font-size: 0.75rem;
    color: #5f6368;
    margin-top: 28px;
`
const Cell1 = styled.span`
    cursor: pointer;
`
const MarginTop = styled.div`
    margin-top: 1.5rem;
`
const TableRecords = (props) => {
    const {global, sort, isLoading} = props;
    const [strong1, setStrong1] = useState(true);
    const [strong2, setStrong2] = useState(false);
    const [strong3, setStrong3] = useState(false);
    const [count1, setCount1] = useState(1);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    const sort1 = () => {
        if(count1 % 2 === 0) {
            sort(true, false, true, true);
        } else {
            sort(true, false, true, false);
        }
        setStrong1(true);
        setStrong2(false);
        setStrong3(false);
        setCount1(count1 + 1);
    }
    const sort2 = () => {
        if(count2 % 2 === 0) {
            sort(false, true, false, true);
        } else {
            sort(false, true, false, false);
        }
        setStrong1(false);
        setStrong2(true);
        setStrong3(false);
        setCount2(count2 + 1);
    }
    const sort3 = () => {
        if(count3 % 2 === 0) {
            sort(false, false, true, true);
        } else {
            sort(false, false, true, false);
        }
        setStrong1(false);
        setStrong2(false);
        setStrong3(true);
        setCount3(count3 + 1);
    }
    return (
        <Box>
            <Title>Số ca nhiễm</Title>
            <Dimmer.Dimmable dimmed={isLoading}>
            <div style={{width: '100%', height: '508px'}}>
                <StickyTable>
                    <Row>
                        <Cell>Vị trí</Cell>
                        <Cell><Cell1 onClick={sort1}>{!strong1 ? 'Số ca xác nhận nhiễm' : (<strong>Số ca xác nhận nhiễm</strong>)} {strong1 ? ((count1 % 2 === 0) ? (<Icon name="arrow up"/>):(<Icon name="arrow down"/>)) : '' }</Cell1></Cell>
                        <Cell><Cell1 onClick={sort2}>{!strong2 ? 'Số ca đã bình phục' : (<strong>Số ca đã bình phục</strong>)} {strong2 ? ((count2 % 2 === 0) ? (<Icon name="arrow up"/>):(<Icon name="arrow down"/>)) : '' }</Cell1></Cell>
                        <Cell><Cell1 onClick={sort3}>{!strong3 ? 'Số ca tử vong' : (<strong>Số ca tử vong</strong>)} {strong3 ? ((count3 % 2 === 0) ? (<Icon name="arrow up"/>):(<Icon name="arrow down"/>)) : '' }</Cell1></Cell>
                    </Row>
                    <Row>
                        <Cell><strong>{global.listCountry ? 'Toàn thế giới' : ''}</strong></Cell>
                        <Cell><strong>{global.totalConfirmed}</strong></Cell>
                        <Cell><strong>{global.totalRecovered}</strong></Cell>
                        <Cell><strong>{global.totalDeaths}</strong></Cell>
                    </Row>
                    {
                        (global.listCountry) ? 
                        global.listCountry.map(item => { return (
                            <Row key={item.CountryCode}>
                                <Cell><img src={`https://www.countryflags.io/${item.CountryCode}/flat/16.png`}/> {item.Country}</Cell>
                                <Cell>{item.TotalConfirmed}</Cell>
                                <Cell>{item.TotalRecovered}</Cell>
                                <Cell>{item.TotalDeaths}</Cell>
                            </Row>
                        )}) : ''
                    }
                   
                </StickyTable>
            </div>
            <Dimmer active={isLoading}>
                <Loader />
            </Dimmer>
            </Dimmer.Dimmable>
            <MarginTop>
                <span>
                    <Bottom>Nguồn: WikipediaEuropean Centre for Disease Prevention and Control</Bottom>
                </span>
            </MarginTop>
        </Box>
    );
}
 
export default TableRecords;