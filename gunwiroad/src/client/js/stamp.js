const getCourseListFetch = async() => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
        window.location.href = "/login?error=need_login";
    }
    const response = await fetch("/api/courses", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if(response.status === 401) {
        return window.location.href = "/login?error=need_login"
    }
    const result = await response.json();
    courseListInfo = result;
}

getCourseListFetch().then(() => {
    const stampContainer = document.querySelector('.stamp-container')
    const achievement = document.querySelector('#achievement')
    const couponAmount = document.querySelector('.coupon-amount')
    const levelNum = document.querySelector('.level-num')
    const barGraph = document.querySelector('.bar-graph')


    let completedStamps = courseListInfo.filter(function(obj) {
        return obj.users_course_id !== null;
    });

    let stampQuantity = completedStamps.length;

    couponAmount.innerHTML = `<a href="/profile">
                                  보유쿠폰<span style="color:red"> ${(stampQuantity >= 1 ? 1 : 0) + Math.floor(stampQuantity / 3) }</span>개
                              </a>`
    levelNum.innerHTML = stampQuantity
    barGraph.style.width = `${stampQuantity * (100/courseListInfo.length)}%`
    achievement.innerHTML =  `스탬프 ${courseListInfo.length}개 중 ${stampQuantity}개 획득!`
    
    let stampLists = ''

    courseListInfo.forEach((course, i) => {
        stampLists += `<div class='stamp'>
                            <img class="stamp-img" src="../file/mission_${course.users_course_id? '' : 'not_'}completed_stamp.png" alt=""> 
                            <div class="stamp-name">${course.course_name}</div>
                        </div>`
    })

    stampContainer.innerHTML = stampLists;
})