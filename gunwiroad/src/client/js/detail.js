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
    const currentPath = window.location.pathname;
    const pageNumber = currentPath.split('/').pop();
    const courseImg = document.querySelector('.detail-course-img img');
    const courseTitle = document.querySelector('.course-title');
    const courseDescription = document.querySelector('.course-description');
    
    courseTitle.innerHTML = courseListInfo[pageNumber].course_name.replace(/<br\s*\/?>/g, ' ');
    courseImg.src = `../file/course_detail_img_${pageNumber}.png`;
    courseDescription.innerHTML = courseListInfo[pageNumber].course_description;
})

const previousPage = document.querySelector('.previous-page');
previousPage.addEventListener('click', () => {
    window.history.back();
})