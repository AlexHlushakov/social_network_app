const ADD_MESSAGE = "social-network/dialogs/ADD_MESSAGE";

let initialState = {
    dial_items: [
        { id: 0, name: "Alex" },
        { id: 1, name: "Vicky" },
        { id: 2, name: "Oleg" },
        { id: 3, name: "Vova" }
    ],
    messages_list: [
        { id: 0, message: "Hi", postDate: "2022-1-13" },
        { id: 1, message: "How are you", postDate: "2022-1-16" },
        { id: 2, message: "Im fine bro it works", postDate: "2022-1-20" },
        { id: 3, message: "Hi,Vova", postDate: "2022-1-26" }
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let id = state.messages_list.length;
            const date = new Date();
            let timeStamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            let newMessage = {
                id: id,
                message: action.message,
                postDate: timeStamp
            };
            let stateCopy = { ...state };
            stateCopy.messages_list = [...state.messages_list];
            stateCopy.messages_list.push(newMessage);
            return stateCopy;
        }

        default:
            return state;
    }
}

export const addMessage = (message) => {
    return { type: ADD_MESSAGE, message: message };
}

export default dialogsReducer;