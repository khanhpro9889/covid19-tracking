import React from 'react';
import NewsItem from './NewsItem';
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
`
const Footer = styled.div`
    text-align: center;
    border-top: 1px solid silver;
    padding-top: 16px;
    color: #1a73e8;
    font-size: 16px;
`
const A = styled.a`
    &:hover{
        text-decoration: none;
    }
`
const News = (props) => {
    const {news} = props;
    return (
        <Box>
            <Title>Tin nổi bật</Title>
            {
                news && news.length !== 0 && news.map(item => {
                    return <NewsItem item={item}/>
                })
            }
            <Footer><A href="#">Tin tức khác</A></Footer>
        </Box>
    )
}

export default News;