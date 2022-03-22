import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDjG3eIbKJrqiveNMeMW3iIxoSRn_Z4N9s",
	authDomain: "lifting-excel.firebaseapp.com",
	databaseURL:
		"https://lifting-excel-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "lifting-excel",
	storageBucket: "lifting-excel.appspot.com",
	messagingSenderId: "493997027765",
	appId: "1:493997027765:web:b5112a1c0697ac4e5469fc",
	measurementId: "G-5TQ1ZT1QGS",
};

// Initialize Firebase

// const analytics = getAnalytics(app);

export const initializeFirebase = () => {
	console.log("Init firebase");
	if (getApps().length === 0) {
		initializeApp(firebaseConfig);

		console.log("Initialized firebase!");
	}
};

initializeFirebase();
