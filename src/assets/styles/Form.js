
import styled from "styled-components"
import { SECONDARY_COLOR } from "../../constants/colors"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 303px;
    width: 80%;
    input {
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        height: 45px;
        margin: 3px 0px;
        padding: 12px 11px;
        
        ::placeholder {
            color: #DBDBDB;
            font-size: 19.976px;
        }
        :focus {
            outline: 1px solid ${SECONDARY_COLOR};
            border: 1px solid ${SECONDARY_COLOR};
        }
    }
    button {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20.976px;
        line-height: 26px;
        background-color: ${props => props.disabled ? "#52B6FF" : SECONDARY_COLOR};
        color: #ffffff;
        border-radius: 4.63636px;
        border: none;
        height: 45px;
        margin: 3px 0px;
    }
`

export default Form