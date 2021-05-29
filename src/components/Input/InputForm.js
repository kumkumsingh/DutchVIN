import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Header, Button } from 'semantic-ui-react';
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

const StyledInput = styled(Input)`
    &.ui.input>input{
        background: #ffdf35 !important;
        text-transform: uppercase !important;
        border-right:none!important;
    }
`;

const StyledButton = styled(Button)`
    background-color: white !important;
    color: black !important;
    border-color: white !important;
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
                        onChange={handleChange} style={{borderRadius:'none'}}/>
                    <StyledButton onClick={handleClick} style={{borderRadius:'none'}}>Send</StyledButton>
                </StyledWrapper>
            </InnerDiv>  
        </React.Fragment>
    );
};

export default InputForm;