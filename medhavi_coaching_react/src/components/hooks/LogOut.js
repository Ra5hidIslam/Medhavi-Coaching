function LogOut() {
    sessionStorage.clear()
    window.localStorage.href = '/';
}

export default LogOut;