const joinBtn = document.getElementById('joinBtn');
const userIdInput = document.getElementById('userId');
const userPasswordInput = document.getElementById('userPassword');
const userPasswordCheckInput = document.getElementById('userPasswordDoubleCheck');
const userNameInput = document.getElementById('userName');

const msgAlert = (position, message, type) => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 2000,
    })
    Toast.fire({title: message, icon: type})
}

const joinFetch = async () => {
    const userId = userIdInput.value;
    const userPassword = userPasswordInput.value;
    const userPasswordCheck = userPasswordCheckInput.value;
    const userName = userNameInput.value;

    if(!userId || !userPassword || !userName) {
        return msgAlert("bottom", "모든 필드를 채워주세요.", "error");
    }

    if(userPassword !== userPasswordCheck) {
        return msgAlert("bottom", "비밀번호가 다릅니다.", "error");
    }

    const response = await fetch("/api/join", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // TODO 로그인 토큰
        },
        body: JSON.stringify({
            userId: userId,
            userPassword: userPassword,
            userName: userName,
        })
    })
    const result = await response.json();

    if(response.status === 201) {
        msgAlert("center", "회원가입 성공", "success");
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000)
    } else {
        msgAlert("bottom", result.status, "error");
    }
    // 존재하는 아이디

}

joinBtn.addEventListener('click', joinFetch)