import { useDispatch, useSelector } from "react-redux";
import { useUploadImageMutation } from "../../redux/userApi";
import { login } from "../../redux/userSlice";

export const SettingsComponent = () => {
    const user = useSelector(state => state.user.user);
    const avatarUrl = useSelector(state => state.user.user.avatar);
    const dispatch = useDispatch();

    const [uploadImage, {data, isSuccess}] = useUploadImageMutation();
    
    const uploadImageFunc = (image) => {
        const formData = new FormData();
        formData.append("image", image);
        uploadImage(formData);
    }
    if (isSuccess) {
        dispatch(login(data.user));
    }
    return(
        <main className="main">
            <div className="main__container">
                <h1>Account Settings</h1>
                <div className="settings-block">
                    <div className="settings-box">
                        Name: {`${user.firstName} ${user.lastName}`}
                    </div>
                    <div className="settings-box">
                        Email: {user.email}
                    </div>
                    <div className="settings-box">
                        Date of birthday: {user.dayOfBirthday || "no information"}
                    </div>
                    <img 
                    src={avatarUrl}
                    alt="Avatar image" 
                    className="avatar" />
                    <input 
                    accept="image/*" 
                    type="file" 
                    onChange={e => uploadImageFunc(e.target.files[0])}/>
                </div>
            </div>
        </main>
    );
}