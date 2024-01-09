import bcrypt from "bcrypt"
import db from "../config/db";
import jwt from "jsonwebtoken";

export const join = async (request, response) => {
    /* 상태코드 - 200 ~ 300: 성공, 400: 프론트 잘못, 500: 백엔드 잘못 */
    const joinData = request.body;

    // id가 중복인지 여부 체크 (duplicate id)
    const QUERY1 = `SELECT * FROM users WHERE user_email = ?`;
    const user = await db.execute(QUERY1, [joinData.userId]).then((result) => result[0][0]);

    if(user) {
        return response.status(400).json({ status: "이미 존재하는 ID입니다." })
    }

    // 비밀번호 암호화
    // 8번 최소, 12번은 좀 많음
    // 높일수록 암호화 높음, 시간 많이 듦
    const hashPassword = await bcrypt.hash(joinData.userPassword, 8);

    const QUERY2 = `
        INSERT INTO users
            (user_email, user_password, user_name)
        VALUES
            (?, ?, ?)`
    
    db.execute(QUERY2, [joinData.userId, hashPassword, joinData.userName]);
    
    response.status(201).json({status: "success"});
}

export const login = async (request, response) => {
    const loginData = request.body; // userId, userPassword

    const QUERY1 = `SELECT * FROM users WHERE user_email = ?`;
    const user = await db.execute(QUERY1, [loginData.userId]).then((result) => result[0][0])

    if(!user) {
        return response.status(400).json({ status: "아이디, 비밀번호 확인"});
    }

    const isPasswordRight = await bcrypt.compare(loginData.userPassword, user.user_password);
    // True, False

    if(!isPasswordRight) {
        return response.status(400).json({status: "아이디, 비밀번호 확인"});
    }

    // 3. json web Token 토큰을 만들어야 함 -> 로그인 유지
    // npm install jsonwebtoken
    const accessToken = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY , { expiresIn: "30d" });
    
    return response.status(200).json({ accessToken: accessToken }); 
}

export const authMe = async (request, response) => {
    const user = request.user;
    return response.status(200).json(user);
}