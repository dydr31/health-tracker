export const isEmailValid = (email: string) => {
    if (email.indexOf("@") > -1){
        return true
    }
    else{
        return false
    }
}

export const isPasswordValild = (password: string) => {
    if (password.length >= 8){
        return true
    }
    else {
        return false
    }
}

