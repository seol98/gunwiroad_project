import db from "../config/db"

export const getCourseList = async (request, response) => {
// 로그인했는지 여부를 판단한다 그래서 유저 id를 가져온다 로그인 안했으면 null
const userId = request.user ? request.user.user_id : null;
// 데이터베이스에서 코스 정보와 방문여부를 가져온다.
const QUERY = `
    SELECT c.*, uc.users_course_id 
    FROM course c 
    LEFT JOIN users_course uc 
    ON c.course_id = uc.course_id
    AND uc.user_id = ?`

  const courseList = await db.execute(QUERY, [userId]).then((result) => result[0]);
  
  response.json(courseList);
}

export const qrCheck = async (request, response) => {
  const userId = request.user.user_id;

  const qrInfoData = request.body;
  console.log(qrInfoData);

  // 검증코드 1: 들어온 qr 코드에 해당하는 코스가 있는지 여부
  const QUERY1 = `SELECT * FROM course WHERE course_qr = ?`

  const course = await db.execute(QUERY1, [qrInfoData.qrCode]).then((result) => result[0][0]);
  if(!course) return response.status(400).json({status: "올바른 QR코드가 아닙니다."});

  // 검증코드 2: 해당유저 이 코스에 방문한적이 있는지
  const QUERY2 = `SELECT * FROM users_course WHERE user_id = ? AND course_id = ?`
  const userVisited = await db.execute(QUERY2, [userId, course.course_id]).then((result) => result[0][0]);

  if(userVisited) return response.status(400).json({status: "이미 방문한 장소입니다."});

  console.log("성공")

  // 검증코드 3 (수학) : 반경 100m내에 있을때만 qr코드 찍을 수 있음 - 선택
  // dist m로 나옴
  const dist = calculatorDistance(qrInfoData.latitude, qrInfoData.longitude, course.latitude, course.longitude)

  if(dist > 100) return response.status(400).json({status: "거리가 너무 멉니다."});

  // 방문완료 - 데이터베이스에 추가
  const QUERY3 = `INSERT INTO users_course (user_id, course_id) VALUES (?,?)`
  await db.execute(QUERY3, [userId, course.course_id]);
  return response.status(201).json({status: "success"});
}

const calculatorDistance = (currentLat, currentLon, targetLat, targetLon) => {
  currentLat = parseFloat(currentLat); // 35.875533...(문자) -> 35.875533...(실수)
  currentLon = parseFloat(currentLon);
  targetLat = parseFloat(targetLat);
  targetLon = parseFloat(targetLon);

  const dLat = (targetLat - currentLat) * 111000 // 111km
  const dLon = (targetLon - currentLon) * 111000 * Math.cos(currentLat * (Math.PI / 180))

  return Math.sqrt(dLat * dLat + dLon * dLon);
}

/* 
    controller => service (중요한 처리들) -> repository
*/