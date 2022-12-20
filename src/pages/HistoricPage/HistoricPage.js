import styled from "styled-components"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import Header from "../../assets/styles/Header"
import { BACKGROUND_COLOR } from "../../constants/colors"

export default function HistoricPage() {
    return (
        <Container>
            <NavBar />
            <Header>
                <h1>Histórico</h1>
            </Header>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Footer /> 
        </Container>
    )
}

const Container = styled.div`
    background-color: ${BACKGROUND_COLOR};
    height: 100vh;
    margin: 70px 0;
    padding: 0 18px;
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin: 17px 0;
    }
`