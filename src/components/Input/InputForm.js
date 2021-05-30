import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Header } from 'semantic-ui-react';
import styled from 'styled-components';
import DetailsStore from '../../redux/CarDetails';

const InnerDiv = styled.div`
    width:100%;
    position: absolute;
    margin-top: -250px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    @media (max-width: 768px) {
        margin-top: -230px;
    }
    
`;
const StyledHeader = styled(Header)`
    color: white !important;
    @media (max-width: 768px) {
        font-size: 20px !important;
    }
`;

const StyledInput = styled.input`
        background: #ffdf35 !important;
        text-transform: uppercase !important;
        border-radius:none!important;
        border:none!important;
        width:150px;
        height:40px;
        padding-left:10px;
    
`;

const StyledButton = styled.button`
    background-color: white !important;
    color: black !important;
    border-color: white !important;
    padding:10px ;
    border-radius:none!important;
    border:none;
    width:100px;
    height:40px;
    
`;
const StyledWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;

const InputForm = () => {

    const [ value, setValue] =  useState('');

    const dispatch = useDispatch();

    const handleClick = (e) => {
       e.preventDefault();
       dispatch(DetailsStore.actions.clearError())
       dispatch(DetailsStore.actions.getDetails(value));

    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <React.Fragment>
            <InnerDiv>
                <StyledHeader as="h1">Please enter your license plate number</StyledHeader>
                <StyledWrapper>
                    <StyledInput 
                        onChange={handleChange}/>
                    <StyledButton onClick={handleClick} >Send</StyledButton>
                </StyledWrapper>
            </InnerDiv>  
        </React.Fragment>
    );
};

export default InputForm;