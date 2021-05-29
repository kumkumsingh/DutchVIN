import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

const Heading = styled.div`
    font-size: 15px;
    padding-bottom:5px;
`;
const DetailsDiv = styled.div`
    position: relative;
    background-color: white;
    width: 400px;
    height: 200px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #D3D3D3;
    margin: auto;
    margin-top: -104px;
    @media (max-width: 768px) {
        margin-top: -98px;
        width: 250px;
        height: 280px;
    }
`
const ErrorText = styled.p`
    color: red;
    font-size: 16px;
    display: flex;
    flex-direction: row;     /* make main axis horizontal (default setting) */
    justify-content: center; /* center items horizontally, in this case */
    align-items: center;     /* center items vertically, in this case */
    height: 200px;
`;

const StyledLoader = styled.div`
    margin-left: 10% !important;
    padding-top: 23% !important;
`;
const MainDiv = styled.div`
    margin: auto;
    width: 80%;
    padding: 10px;
`;
const SubText = styled.div`
    font-size: 17px;
    font-weight:bold;
    color: 	#ccccc;
    padding-bottom: 20px;
`;


const CarDetails = () => {

    const details = useSelector(state => state.details.details);
    const loading =  useSelector(state => state.details.loading);
    const detailsError =  useSelector(state => state.details.error);

    return (
        <DetailsDiv>
            {!loading ? (
                <>
                    {detailsError ? (<ErrorText>{detailsError}</ErrorText>) : (
                        <>
                        {details.kenteken && <MainDiv>
                            <Heading> Trade Name </Heading>
                            <SubText> {details.handelsbenaming}</SubText>
                            
                            <Heading>Date of first admission</Heading>
                            <SubText> {details.datum_eerste_toelating}</SubText>
    
                            <Heading>Fuel description</Heading>
                            {details.brandstof.map((brandstof, i) => {
                                return <SubText key={i}>{brandstof.brandstof_omschrijving}</SubText>
                            })}
                        </MainDiv>}
                        </>
                    )}
                </>
            ) : (
                <StyledLoader>
                    <Loader active inline='centered' />
                </StyledLoader>
            )}
        </DetailsDiv>
    );
};

export default CarDetails;