import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import image from '../../images/campbell.png';
import SimpleCarousal from '../../components/Carousal/SimpleCarousal';
import InputForm from '../../components/Input/InputForm';
import CarDetails from '../../components/CarDetails/CarDetails';

const ImageDiv = styled.div`
    height: 300px;
    text-align: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    @media (max-width: 768px) {
        height: 250px;
    } 
`;

const HomePage = () => {

    const details = useSelector(state => state.details.details);

    return(
        <React.Fragment>
            <ImageDiv 
                style={{ 
                    backgroundImage: `url(${image})`,
                }}
            >  
            </ImageDiv>
            <InputForm />
            <CarDetails />
            {details.kenteken && <div>
                <section
                    style={{
                        margin: "10px 0 10px 0"
                    }}
                >
                    <SimpleCarousal deviceType="desktop"/>
                </section>
            </div>  }  
        </React.Fragment>
    );
};

export default HomePage;