export const signingIn = userInfo => {
    return {
        type: 'SIGN_IN',
        payload: userInfo
    }
}

export const loggingOut = () => {
    return {
        type: 'LOG_OUT'
    }
}