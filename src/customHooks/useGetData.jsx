import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading };
};

export default useGetData;
