import styled from "styled-components"
import Header from "../../assets/styles/Header"
import Footer from "../../components/Footer"
import Habit from "../../components/Habit"
import NavBar from "../../components/NavBar"
import NewHabit from "../../components/NewHabit"
import { BACKGROUND_COLOR } from "../../constants/colors"
import { useEffect, useContext } from "react";
import axios from "axios";
import Context from "../../contexts/Context"
import { URL } from "../../constants/urls"

export default function HabitsPage() {

    const { addHabit, setAddHabit } = useContext(Context);
    const { habits, setHabits } = useContext(Context);
    const { config } = useContext(Context);

    useEffect(() => {
        const promise = axios.get(`${URL}/habits`, config)
        promise.then((res) => {
            setHabits(res.data)

        })
        promise.catch((err) => {
            alert(err.response.data.message)
        })

        
    }, [config, setHabits])


    return (
        <Container>
            <NavBar />
            <Header>
                <h1>Meus hábitos</h1>
                <button onClick={()=>setAddHabit(!addHabit)} data-test="habit-create-btn">+</button>
            </Header>
            <MyHabits>
                {addHabit === true ? <NewHabit /> : null}
                {(habits === []) ? (
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    ) : (
                    habits.map((habit) => (<Habit habit={habit} key={habit.id}/>))                    
                )}
            </MyHabits>
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

const MyHabits = styled.div`
    padding: 22px 0 0 0 ;
`