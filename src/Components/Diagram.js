import React, {useState} from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';

const Box = styled.div`
    padding: 16px;
    border: 1px solid silver;
    border-radius: 8px;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;    
`
const Title = styled.h3`
    font-size: 1.375rem;
    font-weight: 400;
    color: #202124;
    padding-bottom: 8px;
    margin-bottom: 16px;
`
const Content = styled.div`
font-size: 1rem;
font-weight: 500;
color: #202124;
margin-bottom: 20px;
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
const MarginTop = styled.div`
    margin-top: 1.5rem;
`
const Button = styled.button`
    padding: 5px 9px;
    border: 1px solid silver;
    border-radius: 1rem;
    color: black;
    margin-right: 8px;
    margin-bottom: 8px;
    ${({ activeButton }) => activeButton && `
        border: 1px solid #1967d2;
        background: #1967d221;
        color: #1967d2
    `}
    
`
const Diagram = (props) => {
    const {data, isLoading, countryName} = props;
    const [activeButton1, setActiveButton1] = useState(false);
    const [activeButton2, setActiveButton2] = useState(true);
    const handleClickButton1 = () => {
        setActiveButton1(true);
        setActiveButton2(false);
    }
    const handleClickButton2 = () => {
        setActiveButton1(false);
        setActiveButton2(true);
    }
    return (
        <Box>
            
            <Title>Số ca nhiễm theo thời gian</Title>
            <Content>{countryName}</Content>
            <Button activeButton={activeButton1} onClick={handleClickButton1}>Mới</Button> 
            <Button activeButton={activeButton2} onClick={handleClickButton2}>Tổng</Button>
            {!isLoading && <div>
                <Line 
                    data={{
                        labels: data.arrDate,
                        datasets: [{
                            label: 'Confirmed cáse',
                            data: data.arrConfirmed,
                            
                            pointBackgroundColor: "#55bae7",
                            pointBorderColor: "#55bae7",
                            pointHoverBackgroundColor: "#55bae7",
                            pointHoverBorderColor: "#55bae7",
                            
                        }]
                    }}
                    option={{maintainAspectRatio: false}}
                />
            </div>}
            <MarginTop>
                <span>
                    <Time>Cập nhật chưa đầy 1 giờ trước</Time>
                    <Wiki>Theo: Wikipedia</Wiki>
                </span>
            </MarginTop>
        </Box>
    )
}

export default Diagram;