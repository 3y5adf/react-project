const jwt = require('jsonwebtoken');
const JWT_SECRET = 'server_secret_key'; // .env 없이 하드코딩

// 토큰이 정상적인 값인지 판별하기 위해 만든 js
// headers 의 authorization이라는 이름으로 저장?
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: '인증 토큰 없음', isLogin: false });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // 이후 라우터에서 req.user로 사용자 정보 사용 가능
        next();
            //next에는 auth.js를 호출한 부분의 다음 부분이 들어있음
    } catch (err) {
        return res.status(403).json({ message: '유효하지 않은 토큰', isLogin: false });
    }
};