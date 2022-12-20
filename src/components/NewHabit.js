import styled from "styled-components"
import { SECONDARY_COLOR } from "./../constants/colors"
import { ThreeDots } from "react-loader-spinner";
import { useState, useContext } from "react"
import Context from "../contexts/Context";
import { URL } from "../constants/urls";
import axios from "axios";

export default function NewHabit() {

    const { addHabit, setAddHabit } = useContext(Context);
    const { habits, setHabits } = useContext(Context);
    const { config } = useContext(Context);

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [days, setDays] = useState([])

    const newHabitForm = {
        name: name,
        days: days
    }

    const weekDays = [
        { name: "D", id: 0 },
        { name: "S", id: 1 },
        { name: "T", id: 2 },
        { name: "Q", id: 3 },
        { name: "Q", id: 4 },
        { name: "S", id: 5 },
        { name: "S", id: 6 },
    ];

    function sendNewHabit(e) {

        e.preventDefault();

        setLoading(true);

        const promise = axios.post(`${URL}/habits`, newHabitForm, config);

        promise.then((res) => {
            setLoading(false);
            setAddHabit(!addHabit);
            setHabits(()=>[...habits,  res.data])
        });

        promise.catch((err) => {
          setLoading(false);
          alert(err.response.data.message);
        });
    }

    function selectDay(day) {
        if (days.includes(day)) {
            setDays(days.filter((el) => el !== day))
        }
        else {
            setDays([...days, day])
        }

    }

    return (
        <Container data-test="habit-create-container">
            <form onSubmit={sendNewHabit}>
                <input type="text" placeholder="nome do hábito" data-test="habit-name-input" onChange={(e) => setName(e.target.value)} disabled={loading} required/>
                <ContainerDays>
                    {weekDays.map((day) => (
                        <div onClick={()=>selectDay(day.id)} key={day.id} disabled={loading}><Day data-test="habit-day" days={days} id={day.id}>{day.name}</Day></div>
                    ))}
                </ContainerDays>
                <ContainerButtons>
                    <CancelButton data-test="habit-create-cancel-btn" onClick={()=>setAddHabit(!addHabit)} disabled={loading}>Cancelar</CancelButton>
                    {loading ? (
                        <SaveButton disabled={loading}><ThreeDots type="ThreeDots" color="#FFFFFF" height={45} width={60} /></SaveButton>) : (
                        <SaveButton disabled={loading} type="submit" data-test="habit-create-save-btn">Salvar</SaveButton>)}  
                </ContainerButtons>
            </form>
        </Container>
    )
}

const Container = styled.div`
    background-color: #FFFFFF;
    height: 180px;
    border-radius: 5px;
    padding: 18px;
    input {
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 10px;
        ::placeholder {
            color: #DBDBDB;
            font-size: 19.976px;
        }
        :focus {
            outline: 0.1px solid #D4D4D4;
            border: 0.1px solid #D4D4D4;
        }
    }
`

const ContainerDays = styled.div`
    display: flex;
`

const Day = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    text-align: center;
    line-height: 25px;
    color: ${props => props.days.includes(props.id) ? "#FFFFFF" : "#DBDBDB"};
    background-color: ${props => props.days.includes(props.id) ? "#CFCFCF" : "#FFFFFF" };
    margin: 8px 2px;
    cursor: pointer;
`

const ContainerButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 22px;
`

const CancelButton = styled.div`
    font-family: 'Lexend Deca';
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: ${SECONDARY_COLOR};
    background-color: #FFFFFF;
    border: none;
    cursor: pointer;
    margin-right: 18px;
`

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: ${SECONDARY_COLOR};
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`