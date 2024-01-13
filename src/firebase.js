import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, collectionGroup, doc, getDoc, getDocs, setDoc, limit, where } from 'firebase/firestore/lite';
// TODO: CHANGE DATABASE RULES 

const firebaseConfig = {
  apiKey: "AIzaSyDhncq1fGLGDqkAi93hoHK-_jX-orJhHIs",
  authDomain: "we-gaucho-food.firebaseapp.com",
  projectId: "we-gaucho-food",
  storageBucket: "we-gaucho-food.appspot.com",
  messagingSenderId: "267203797981",
  appId: "1:267203797981:web:81e3cec1ccbe74fb910c34",
  measurementId: "G-PHRSN1DLQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const diningHalls = {
  CARRILLO: "carrillo",
  DLG: "dlg",
  ORTEGA: "ortega",
  PORTOLA: "portola"
}

const diningHallsPath = "dining-halls"
const entreesPath = "entrees"

function toDbName(entree) {
  return entree.toLowerCase().replace(" ", "-");
}

/**
 * get all the entrees for a given diningHall
 * @param {string} diningHall the diningHall to get entrees for. Use diningHalls enum
 * @returns list of entrees from that dining hall, including their reviews (TODO: and maybe pictures)
 */
export async function getAllEntreesAndReviews(diningHall) {
  const entreesRef = collection(db, diningHallsPath, diningHall, entreesPath);
  const entreesSnapshot = await getDocs(entreesRef);
  const entreesList = entreesSnapshot.docs.map(doc => doc.data());

  const reviewsRef = collectionGroup(db, "reviews");
  const reviewsSnapshot = await getDocs(reviewsRef);

  entreesList.forEach(entree => {
    const entreeReviews = reviewsSnapshot.docs
      .filter(doc => doc.ref.path.includes(toDbName(entree.name)) && doc.ref.path.includes(diningHall))
      .map(doc => doc.data());
    entree.reviews = entreeReviews;
  });

  return entreesList;
}


/**
 * get the reviews for a given entree at a dining hall
 * @param {string} diningHall the diningHall to get entrees for. Use diningHalls enum
 * @param {string} entree the name of the entree. Use the value from getEntrees
 * @returns list of reviews, which includes the review text and the rating
 */
/*
export async function getReviews(diningHall, entree) {
  
  const reviewsRef = collection(db, diningHallsPath, diningHall, entreesPath, entree, "reviews");
  const reviewsSnapshot = await getDocs(reviewsRef);
  const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
  return reviewsList;
}*/

/**
 * Create a review for a given entree at a dining hall. 
 * @param {string} diningHall the diningHall to get entrees for. Use diningHalls enum
 * @param {string} entree the name of the entree. Use the value from getEntrees
 * @param {string} reviewText the text of the review
 * @param {number} reviewRating the rating of the review
 */
export async function addReview(diningHall, entree, reviewText, reviewRating) {
  const reviewsRef = collection(db, diningHallsPath, diningHall, entreesPath, entree, "reviews");

  const reviewData = {
    text: reviewText,
    rating: reviewRating
  }

  await setDoc(doc(reviewsRef), reviewData);
}

/**
 * Adds an entree to the database if there is a new entree today
 * @param {string} diningHall the diningHall to get entrees for. Use diningHalls enum
 * @param {string} entree the name of the entree. Use the value from getEntrees
 */

export async function addEntree(diningHall, entree) {
  const entreesRef = collection(db, diningHallsPath, diningHall, entreesPath);

  const entreeData = {
    name: entree
  }

  await setDoc(doc(entreesRef), entreeData);
}



