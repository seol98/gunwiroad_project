document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splash");
    
    // 세션 스토리지에서 "splashShown" 키를 확인하여 스플래시 화면을 보여줄지 결정합니다.
    const splashShown = sessionStorage.getItem("splashShown");
    
    if (!splashShown) {
        // 스플래시 화면을 보여준 후 "splashShown" 키를 세션 스토리지에 저장합니다.
        setTimeout(function () {
            hideSplashScreen();
            sessionStorage.setItem("splashShown", "true");
        }, 2000); // 3초 (3000 밀리초) 후에 숨김
    } else {
        // 이미 스플래시 화면을 본 경우에는 바로 숨깁니다.
        hideSplashScreen();
    }

    function hideSplashScreen() {
        // 스플래시 화면을 숨깁니다.
        splash.style.display = "none";
        
        // 이후에는 다른 초기화 로직을 실행할 수 있습니다.
        // 여기에 웹 앱의 초기화 코드를 추가하세요.
    }
});