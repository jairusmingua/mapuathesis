function isLogin(){

    if(localStorage.getItem("s_u")=="true"){
        return true;
    }
    return false;
}
function isDone(){

    if(localStorage.getItem("s_u")=="false"){
        return true;
    }
    return false;
}
export const util ={isLogin,isDone};