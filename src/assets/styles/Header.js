import styled from "styled-components"
import { SECONDARY_COLOR, TITLE_COLOR } from "../../constants/colors"

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 28px 0 0 0;
    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: ${TITLE_COLOR};
    }
    button {
        width: 40px;
        color: #FFFFFF;
        background-color: ${SECONDARY_COLOR};
        border-radius: 4.63636px;
        border: none;
        font-family: 'Lexend Deca';
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        cursor: pointer;
    }
`

export default Header