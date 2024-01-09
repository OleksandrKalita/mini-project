import { useState } from "react";
import { useCreateTaskMutation } from "../../redux/taskApi";

export const CreateComponent = () => {
    const [text, setText] = useState("");
    const [datetime, setDatetime] = useState("");
    const [type, setType] = useState("task");

    const [createTask, {data, isSuccess}] = useCreateTaskMutation();

    const currentData = new Date().toISOString().split("T")[0];

    const submitHandler = (event) => {
        event.preventDefault();

        createTask({
            token: localStorage.getItem("token"),
            task: {
                text,
                type,
                status: "pending",
                createDate: currentData,
                expiredDate: new Date(datetime).toUTCString(),
            }
        });

        setText("");
        setDatetime("");
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
                type={type === "event" ? "datetime-local" : "date"} 
                className="form__input"
                min={currentData}
                value={datetime}
                onChange={event => setDatetime(event.target.value)} />
                <div className="radio-block">
                    <label htmlFor="" className="radio-label">
                        <input
                        type="radio" 
                        name="typeOf"
                        onChange={event => setType("task")} />
                        task
                    </label>
                    <label htmlFor="" className="radio-label">
                        <input 
                        type="radio" 
                        name="typeOf"
                        onChange={event => setType("event")} />
                        event
                    </label>
                </div>
                <button className="button form__button">submit</button>
            </form>
        </div>
    );
}