import styled from "styled-components"
import { SECONDARY_COLOR } from "../constants/colors"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { useContext } from "react"
import Context from "../contexts/Context";

export default function Circle() {
    
    const { progress } = useContext(Context);

    return (    
        <ContainerProgressBar>
            <Link to={`/hoje`}>
                <CircularProgressbar
                    value={progress}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: `${SECONDARY_COLOR}`,
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                />
            </Link>
        </ContainerProgressBar>
    )        
}

const ContainerProgressBar = styled.div`
    width: 91px;
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;
`