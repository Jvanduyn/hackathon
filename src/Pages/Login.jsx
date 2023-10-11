import React, { useState } from "react";
import { Link } from "react-router-dom";

export default (props) => {
    return (
        <div>This is the login!</div>
    )
    // const [formState, setFormState] = useState({ email: "", password: "" });
    // const [login, { error, data }] = useMutation(LOGIN_USER);

    // // update state based on form input changes
    // const handleChange = (event) => {
    //     const { name, value } = event.target;

    //     setFormState({
    //         ...formState,
    //         [name]: value,
    //     });
    // };

    // // submit form
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(formState);
    //     try {
    //         const { data } = await login({
    //             variables: { ...formState },
    //         });

    //         Auth.login(data.login.token, data.login.user._id);
    //     } catch (e) {
    //         console.error(e);
    //     }

    //     // clear form values
    //     setFormState({
    //         email: "",
    //         password: "",
    //     });
    // };
}