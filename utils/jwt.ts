import { JWTPayload, SignJWT, jwtVerify } from 'jose';
// npm install jose

// jose：JWTを作成・検証する
const secretKey = 'secret';
const encodedKey = new TextEncoder().encode(secretKey);

// JWTを生成
export async function encrypt(payload: JWTPayload) {  // payload(JWTに格納するデータ)の受け取り
  // 受け取ったデータをJWTのペイロードに設定する
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })  // HS256というアルゴリズムで署名
    .setIssuedAt()  // 発行日時の指定
    .setExpirationTime('7d')  // 発行から7日間有効
    .sign(encodedKey);  // JWT文字列を生成
}

// JWTを検証・復号する
export async function decrypt(session: string | undefined = '') {
  try {
    // JWTを受け取り署名を検証
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;  // 問題がなければpayloadを返す
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}