const initialStateCustomer = {
    fullName: '',
    natioanlId: '',
    createdAt: ''
};
export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                natioanlId: action.payload.natioanlId,
                createdAt: action.payload.createdAt
            };
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload
            };
        default:
            return state;
    }
}
export function createCustomer(fullName, natioanlId) {
    return {
        type: 'customer/createCustomer',
        payload: { fullName, natioanlId, createdAt: new Date().toISOString() }
    };
}

export function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName
    };
}
