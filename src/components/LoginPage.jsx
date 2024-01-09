import { useState } from "react";
import { useLogInUserMutation } from "../redux/userApi";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";


export const LoginPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("tkaczenko.dima@gmail.com");
    const [password, setPassword] = useState("1234jukGdI2x");

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [logInUser, {data, isSuccess}] = useLogInUserMutation();

    if (isSuccess) {
        dispatch(login(data.user));
        localStorage.setItem("token", data.token);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        logInUser({email, password});
    }

    return (
        <div className="wrapper">
            <div className="content">
                <div className="content__container">
                    <form action="" className="auth-form" onSubmit={event => submitHandler(event)}>
                        <input 
                        type="text" 
                        className="form__input"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />
                        <input 
                        type={passwordVisible ? "text" : "password"}
                        className="form__input"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        onFocus={event => setPasswordVisible(true)}
                        onBlur={event => setPasswordVisible(false)}
                        />
                        <button className="button form__button">submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}