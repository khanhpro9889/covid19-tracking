import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';



const Author = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`
const ClearFix = styled.div`
    display: flex;
    padding-top: 15px;
    border-top: 1px solid silver;
    justify-content: space-between;
    margin-bottom: 1rem;
`
const Left = styled.div`
    padding-right: 10px;
    width: 70%;
    float: left;
`
const Right = styled.div`
    width: 30%;
    float: left;
`
const Title = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    word-break: break-all;
`
const Bottom = styled.div`
    color: silver;
    font-size: 12px;
    margin-bottom: 1rem;
`
const Img = styled.img`
    width: 100%;
`
const A = styled.a`
    color: #5f6368;
    &:hover {
        color: #5f6368;
    }
`
const Footer = styled.div`
    padding-top: 2px;
    overflow: auto;
    margin-bottom: 10px;
`
const Time = styled.div`
    float: left;
    color: silver;
`
const Social = styled.div`
    float: left;
    transition: 0.5s;
    opacity: 0;
    visibility: hidden;
    & > span::after {
        transition: 0.5s;
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        height: 22px;
        width: 22px;
        border: 1px solid gray;
        border-radius: 50%;
        visibility: hidden;
        opacity: 0;
    }
    & > span {
        position: relative;
        border-radius: 50%;
        padding: 2px;
        margin-left: 10px;
        color: gray;
        cursor: pointer;
        transition: 0.5s;
    }
    & > span:hover::after {
        opacity: 1;
        visibility: visible;
    }
`
const Parent = styled.div`
    &:hover ${Social}{
        visibility: visible;
        opacity: 1;
    }
`
const NewsItem = (props) => {
    const {item} = props;
    const day = new Date(item.publishedAt).getDate();
    const year = new Date(item.publishedAt).getFullYear();
    const month = new Date(item.publishedAt).getMonth();
    return (
        <Parent>
            <ClearFix>
                <Left>
                    <Author>{item.author}</Author>
                    <Title><A href={item.url}>{item.title}</A></Title>
                </Left>
                <Right>
                    <Img src={item.urlToImage} />
                </Right>
            </ClearFix>
            <Footer>
                <Time>{day}/{month}/{year}</Time>
                <Social>
                    <span><Icon name="bookmark outline"/></span>
                    <span><Icon name="share alternate"/></span>
                    <span><Icon name="options"/></span>
                </Social>
            </Footer>
            

        </Parent>
    )
}

export default NewsItem