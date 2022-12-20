import { useContext } from "react";
import styled from "styled-components"
import trash_icon from "./../assets/images/trash-icon.svg"
import axios from "axios";
import Context from "../contexts/Context";
import { URL } from "../constants/urls";
import Swal from "sweetalert2";

export default function Habit({ habit }) {

    const { habits, setHabits } = useContext(Context);
    const { config } = useContext(Context);

    const days = [
        { name: "D", id: 0 },
        { name: "S", id: 1 },
        { name: "T", id: 2 },
        { name: "Q", id: 3 },
        { name: "Q", id: 4 },
        { name: "S", id: 5 },
        { name: "S", id: 6 },
    ];

    function deleteHabit(id) {
        
        Swal.fire({
            title: "Quer mesmo excluir este hábito?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim! Apague meu hábito!",
            }).then((result) => {
                if (result.isConfirmed) {

                    axios.delete(`${URL}/habits/${id}`, config, {data: id})

                    setHabits(habits.filter((el) => el.id !== id))
                }
        })
    }

    return (

        <Container>
            <ContainerHabit data-test="habit-container">
                <h3  data-test="habit-name">{habit.name}</h3>
                <img src={trash_icon} data-test="habit-delete-btn" alt="Lixeira" onClick={()=> deleteHabit(habit.id)}/>
            </ContainerHabit>    
            <ContainerDays>
                {days.map((day) => (
                    <Day key={day.id} habitDays={habit.days} id={day.id} data-test="habit-day">{day.name}</Day>
                ))}
            </ContainerDays>
        </Container>
    )
}

const Container = styled.div`
    background-color: #FFFFFF;
    height: 91;
    border-radius: 5px;
    padding: 18px;
    margin: 5px 0;
    h3 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
`

const ContainerHabit = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    word-break: break-word;
    img {
        width: 15px;
        margin: 0 0 0 10px;
        cursor: pointer;
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
    color: ${props => props.habitDays.includes(props.id) ? "#FFFFFF" : "#DBDBDB"};
    background-color: ${props => props.habitDays.includes(props.id) ? "#CFCFCF" : "#FFFFFF" };
    margin: 8px 2px;
`