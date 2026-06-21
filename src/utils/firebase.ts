import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  projectId: "gen-lang-client-0196407504",
  appId: "1:506467203609:web:a29fc36b573b7f898fc888",
  apiKey: "AIzaSyB8R4-5W0nIDEjefoAEqrKn5pN9jk_B1y0",
  authDomain: "gen-lang-client-0196407504.firebaseapp.com",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
