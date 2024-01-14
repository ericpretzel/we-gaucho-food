import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, collectionGroup, doc, writeBatch, getDocs, setDoc } from 'firebase/firestore/lite';
// TODO: CHANGE DATABASE RULES 
// TODO AUTHENTICATION

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
  DLG: "de-la-guerra",
  ORTEGA: "ortega",
  PORTOLA: "portola"
}

const diningHallsPath = "dining-halls"
const entreesPath = "entrees"


/**
 * gets the path name for the entree
 * @param {string} entree the pretty name of the entree
 * @returns the database name of the entree, with whitespace and special symbols removed
 */
function toDbName(entree) {
  // make lowercase, replace whitespace with dashes
  // remove special symbols
  return entree.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
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
 * @param {string} entree the "pretty" name of the entree
 * @param {string} reviewText the text of the review
 * @param {number} reviewRating the rating of the review
 */
export function addReview(diningHall, entree, reviewText, reviewRating) {
  const reviewsRef = collection(db, diningHallsPath, diningHall, entreesPath, toDbName(entree), "reviews");

  const reviewData = {
    text: reviewText,
    rating: reviewRating
    // add date, reviewer name?
  }

  return setDoc(doc(reviewsRef), reviewData);
}

/**
 * Adds an entree to the database if there is a new entree today
 * @param {string} diningHall the diningHall to get entrees for. Use diningHalls enum
 * @param {string} entree the "pretty" name of the entree
 */

export function addEntrees(diningHall, entrees) {
  const batch = writeBatch(db);
  const entreesRef = collection(db, diningHallsPath, diningHall, entreesPath);

  for (const entree of entrees) {
    const entreeData = {
      name: entree.name
    }
    batch.set(doc(entreesRef, toDbName(entreeData.name)), entreeData);
  }

  return batch.commit();
}
