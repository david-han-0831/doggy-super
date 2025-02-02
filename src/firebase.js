// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRLGkXD6uImdC7zJBagDpcG1G63MkmkPo",
  authDomain: "doggy-note.firebaseapp.com",
  projectId: "doggy-note",
  storageBucket: "doggy-note.firebasestorage.app",
  messagingSenderId: "1017555342357",
  appId: "1:1017555342357:web:699626b4f93e477db3ea1c",
  measurementId: "G-MQR7VP97Z3"
};


// Firebase 중복 초기화 방지
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔹 Google 로그인 함수
export const signInWithGoogle = async () => {
    try {
        // ✅ Google 로그인 실행
        const result = await signInWithPopup(auth, googleProvider);
        console.log("✅ 로그인 결과:", result);
    
        if (!result.user) throw new Error("Firebase에서 사용자 정보를 가져오지 못했습니다.");
    
        // ✅ Firebase ID 토큰 가져오기 (강제 갱신)
        const idToken = await result.user.getIdToken(true);
        console.log("✅ Firebase Token:", idToken);
    
        return idToken;
    } catch (error) {
        console.error("❌ Google 로그인 실패:", error.message);
        return null;
    }
  };