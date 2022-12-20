import { useState, useContext, useEffect } from "react"
import styled from "styled-components";
import Context from "../contexts/Context";
import axios from "axios"
import { URL } from "../constants/urls";

export default function TodayHabit({ tHabits, refresh, setRefresh }) {

    const { todayHabits } = useContext(Context);
    const { progress, setProgress } = useContext(Context);
    const { config } = useContext(Context);

    const [done, setDone] = useState(tHabits.done)
    const [count, setCount] = useState(0);
    
    function refreshHabits() {
        let ref = () => setRefresh(!refresh)
    }
    
    function VerifyHabit(tHabits) {

        if (done === false) {

            const promise = axios.post(`${URL}/habits/${tHabits.id}/check`, {}, config)

            promise.then((res) => {
                setProgress(progress + 100 / todayHabits.length);
                setDone(!done)
                refreshHabits()
                console.log(res)
            })

            promise.catch((err) => {
                alert(err.response.data.message)
            }) 
        }
        else {

            const promise = axios.post(`${URL}/habits/${tHabits.id}/uncheck`, {}, config)

            promise.then((res) => {
                setProgress(count *(progress - 100 / todayHabits.length));
                setDone(!done);
                refreshHabits()
                console.log(res)
            })

            promise.catch((err) => {
                alert(err.response.data.message)
            })
        }
    }

    return (
        <Container>
            <div>
                <h1 data-test="today-habit-name">{tHabits.name}</h1>
                <Span1 data-test="today-habit-sequence">Sequência atual: </Span1><Span2 done={done}>{tHabits.currentSequence} dias</Span2>
                <br></br>
                <Span1 data-test="today-habit-record">Seu recorde: </Span1><Span3 done={done} highest={tHabits.highestSequence} current={tHabits.currentSequence}>{tHabits.highestSequence} dias</Span3>
            </div>
            <Checkbox done={done}>
                <ion-icon data-test="today-habit-check-btn" onClick={()=>VerifyHabit(tHabits)} name="checkbox"></ion-icon> 
            </Checkbox>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3px 3px 3px 15px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    h1 {
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        padding: 0 0 7px 0;
    }
`

const Checkbox = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: flex-end;
    ion-icon {
        width: 90px;
        height: 90px;
        color: ${(props) => props.done === true ? "#8FC549" : "#EBEBEB" };
        cursor: pointer;
    }
`

const Span1 = styled.span`
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
`

const Span2 = styled.span`
        font-size: 12.976px;
        line-height: 16px;
        color: ${(props) => props.done === true ? "#8FC549" : "#666666" };
`

const Span3 = styled.span`
        font-size: 12.976px;
        line-height: 16px;
        color: ${(props) => ((props.done === true && props.current === props.highest) ? "#8FC549" : "#666666" )};
`