import styled from "styled-components"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { BACKGROUND_COLOR, TITLE_COLOR } from "../../constants/colors"
import TodayHabit from "../../components/TodayHabit"
import { URL } from "../../constants/urls"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Context from "../../contexts/Context"
import dayjs from "dayjs";
import "dayjs/locale/pt-br"

export default function TodayPage() {

    const { config } = useContext(Context);
    const { progress, setProgress } = useContext(Context);
    const { todayHabits, setTodayHabits } = useContext(Context);
    const { refresh, setRefresh } = useContext(Context);

    const [count, setCount] = useState(true);

    const date = dayjs().locale("pt-br").format("dddd, DD/MM").replace("-feira" , "");
    const formatedDate = date.charAt(0).toUpperCase() + date.slice(1);

    useEffect(() => {

        const promise = axios.get(`${URL}/habits/today`, config)

        promise.then((res) => {
            setTodayHabits(res.data)
            setCount(!count)
        })

        promise.catch((err) => {
            alert(err.response.data.message)
        })
        
    }, [config, todayHabits, refresh])

    useEffect(() => {

        const counter = todayHabits.reduce((counter, obj) => obj.done === true ? counter += 1 : counter, 0)
        setProgress(counter * (100 / todayHabits.length))
        
    }, [count])

    return (
        <Container>
            <NavBar />
            <Header>
                <h1 data-test="today">{formatedDate}</h1>
                <Paragraph data-test="today-counter" habitProgress={progress}>{progress === 0 || isNaN(progress) ? "Nenhum hábito concluído ainda" : `${progress}% dos hábitos concluídos` }</Paragraph>
            </Header>
            <ContainerHabits>
                {todayHabits.map((tHabits) => <TodayHabit data-test="today-habit-container" key={tHabits.id} refresh={refresh} setRefresh={setRefresh} tHabits={tHabits}/>)}
            </ContainerHabits>
            <Footer /> 
        </Container>
    )
}

const Container = styled.div`
    background-color: ${BACKGROUND_COLOR};
    height: 100vh;
    margin: 70px 0;
    padding: 0 18px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px 0;
    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: ${TITLE_COLOR};
    }
`	

const Paragraph = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${(props) => props.habitProgress === 0 || isNaN(props.habitProgress) ? "#bababa" : "#8FC549" };
`

const ContainerHabits = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`