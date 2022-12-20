import styled from "styled-components"
import { BASE_COLOR } from "../constants/colors"
import Context from "../contexts/Context"
import { useContext } from "react"
import { Link } from "react-router-dom"

export default function NavBar() {

    const { userInfo } = useContext(Context);

    return (
        <Container data-test="header">
            <Link to="/"><h6>TrackIt</h6></Link>
            <img src={userInfo.image} alt="Foto de perfil"></img>
        </Container>
    )
}

const Container = styled.div`
    height: 70px;
    background-color: ${BASE_COLOR};
    padding: 10px 18px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 2;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    
    h6{
        font-family: 'Playball', cursive;
        color: #ffffff;
        font-size: 38.982px;
        line-height: 49px;
    }
    img {
        max-width: 51px;
        height: 51px;
        border-radius: 50%;
        object-fit: cover;
    }
`