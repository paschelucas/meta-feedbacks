import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import GlobalContext from "../../Global/GlobalContext";

const UserCard = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {editUserRole} = useContext(GlobalContext);

    return (
        <li key={props.id}>
            <hr />
            <p>{props.name}</p>
            <p>{props.email}</p>
            <Popup trigger={<p style={{cursor: 'pointer'}}>{props.role}</p>} position="center">
                {close => (
                <form onSubmit={handleSubmit((data)=> editUserRole(data, props.name, close))}>
                    <select {...register('newRole')}>
                        <option value="">Selecione</option>
                        <option value="admin">Administrador</option>
                        <option value="mentor">Mentor</option>
                        <option value="gestor">Gestor</option>
                    </select>
                    <button type='submit'>mudar</button>
                </form>
                )}
            </Popup>
        </li>
    );
};
export default UserCard;