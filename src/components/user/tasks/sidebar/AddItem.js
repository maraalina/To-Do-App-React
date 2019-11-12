import React, { useState } from 'react';
import { withContext } from '../../../app/AppContext';
import FormInput from './FormInput';
import AddIcon from './AddIcon';

const AddItem = ({ addList }) => {

    const [isClicked, setClick] = useState(false)
    const [value, setValue] = useState({ name: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value === '') {
            console.log("Provide a name for your list")
        } else {
        addList(value)
            .then( () => {
                setValue({ name: ''})
            })
            .catch(err => console.error(err.response.data.message))
        }
    }

    return (
        isClicked ? 
            ( <FormInput
                name={value.name}
                handleSubmit={handleSubmit}
                handleChange={(e) => setValue({name: e.target.value})}
                setClick={setClick}
             /> ) 
            : 
            ( <AddIcon setClick={setClick} /> )
    )
}

export default withContext(AddItem);