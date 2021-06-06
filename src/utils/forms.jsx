const formReducer = (state, event) => {
    console.log(event.target)
    return {
        ...state,
        [event.target.name]: event.target.value
    };
}

export default formReducer;