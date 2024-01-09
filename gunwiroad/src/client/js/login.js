const joinBtn = document.querySelector('.join');
const loginBtn = document.querySelector('.login');
const userIdInput = document.getElementById('userId');
const userPasswordInput = document.getElementById("userPassword");

const msgAlert = (position, message, type) => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 2000,
    })
    Toast.fire({title: message, icon: type})
}

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const errorMessage = getParameterByName("error");

if(errorMessage === "need_login") {
    msgAlert("bottom", "로그인이 필요합니다", "error");
} else if(errorMessage === "sns_login_fail") {
    msgAlert("bottom", "SNS 로그인 실패", "error");
}

const loginFetch =  async () => {
    const userId = userIdInput.value;
    const userPassword = userPasswordInput.value;

    if(!userId || !userPassword ) {
        msgAlert("bottom", "모든 필드를 채워주세요", "error");
    }

    const response = await fetch("/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // TODO 로그인 토큰
        },
        body: JSON.stringify({
            userId: userId,
            userPassword: userPassword,
        })
    })
    const result = await response.json()
    
    if(response.status === 200) {
        localStorage.setItem("accessToken", result.accessToken);
        /* msgAlert("center", "로그인 성공", "success") */
        setTimeout(() => {
            window.location.href = "/";
        }, 1000)
    } else {
        msgAlert("bottom", result.status, "error")
    }
}

loginBtn.addEventListener('click', loginFetch);

joinBtn.addEventListener('click', () => window.location.href = "/join");