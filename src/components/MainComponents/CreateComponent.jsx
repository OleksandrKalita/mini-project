import { useState } from "react";
import { useCreateTaskMutation } from "../../redux/taskApi";

export const CreateComponent = () => {
    const [text, setText] = useState("");
    const [date, setDate] = useState("");

    const [createTask, {data, isSuccess}] = useCreateTaskMutation();

    const currentData = new Date().toISOString().split("T")[0];

    const submitHandler = (event) => {
        event.preventDefault();

        createTask({
            token: localStorage.getItem("token"),
            task: {
                text,
                createDate: currentData,
                expiredDate: date
            }
        });

        setText("");
        setDate("");
    }

    if (isSuccess) {
        alert(data.message);
    }

    return (
        <div className="wrapper">
            <form action="" className="create-form" onSubmit={event => submitHandler(event)}>
                <input 
                type="text" 
                className="form__input"
                value={text}
                onChange={event => setText(event.target.value)} />
                <input 
                type="date" 
                className="form__input"
                min={currentData}
                value={date}
                onChange={event => setDate(event.target.value)} />
                <button className="button form__button">submit</button>
            </form>
        </div>
    );
}