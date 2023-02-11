import {useState} from "react";

export const useForm = (initialForm = {})=> {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [name]:value
        })
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    //...formState envia los atritos desestructurados del objeto
    return{
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };

}