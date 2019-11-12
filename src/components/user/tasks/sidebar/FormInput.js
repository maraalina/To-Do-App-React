import React from 'react';

const FormInput = ({ handleSubmit, name, handleChange, setClick}) => {
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
                <input className="input-form inputAddList"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder="Add a new todo list"
                />
    
            <input 
                type="submit"
                value="Save"
                onClick={setClick}
            />

            <button type="button" className="cancel" onClick={() => setClick(false)}>
                    Cancel
                </button>
        </form>   
    )
}

export default FormInput;