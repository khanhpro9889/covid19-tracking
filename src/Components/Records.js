import React from 'react';
import styled from 'styled-components';
import {Loader, Dimmer, Segment} from 'semantic-ui-react'
const Box = styled.div`
    padding: 16px;
    border: 1px solid silver;
    border-radius: 8px;
    margin-bottom: 32px;
    z-index: -1;
    position: relative;
`
const Title = styled.h3`
    font-size: 1.375rem;
    font-weight: 400;
    color: #202124;
    padding-bottom: 8px;
    margin-bottom: 16px;
`
const ClearFix = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`
const SubBox = styled.div`
    width: 30%;
`

const SubTitle = styled.div`
    color: #5f6368;
    font-size: 0.75rem
`

const Number = styled.div`
    margin: 4px 0;
    font-size: 26px;
    font-weight: bold;
`
const Time = styled.span`
    font-size: 0.75rem;
    color: #5f6368;
`
const Wiki = styled.span`
    font-size: 0.75rem;
    color: #5f6368;
    margin-left: 10px;
`

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const Records = (props) => {
    const {data, isLoading} = props;

    return (
        <Box>
            <Title>Toàn thế giới</Title>
            <ClearFix>
                <SubBox>
                    <SubTitle>Số ca xác nhận nhiễm</SubTitle>
                    <Number>{!isLoading ? data.totalConfirmed : (<Loader active inline/>)}</Number>
                </SubBox>
                <SubBox>
                    <SubTitle>Số ca đã bình phục</SubTitle>
                    <Number>{!isLoading ? data.totalRecovered : (<Loader active inline/>)}</Number>
                </SubBox>
                <SubBox>
                    <SubTitle>Số ca tử vong</SubTitle>
                    <Number>{!isLoading ? data.totalDeaths : (<Loader active inline/>)}</Number>
                </SubBox>
            </ClearFix>
            <div>
                <span>
                    <Time>Cập nhật chưa đầy 1 giờ trước</Time>
                    <Wiki>Theo: Wikipedia</Wiki>
                </span>
            </div>
        </Box>
    );
}
 
export default Records;