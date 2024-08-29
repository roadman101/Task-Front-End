/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);  // State ti stoe the fetched Data.

    // useEffect hoot to perform side effects (data fetching in this case)

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {
        const getData = async () => {
            // Async function to fetch data
            const response = await fetch(url);  // Fetch data from the provided URL
            const jData = await response.json();  // Parse response JSON data and keep inside jData

            setData(jData.tasks ? jData.tasks : jData.task); // Update the [data] state that was formally null with setData... updating with fetched data
            setLoading(false);  // Set loading state to false when data is fetched
            console.log(jData);  
            
        };

        setTimeout( async () => {
          try {
            await getData();  // Envoke the getData function 
          } catch (error) {
            console.log(error);
            setError("Something went wrong");
            setLoading(false);
          }
        }, 3000);
    }, []);

    return { data, setData, loading, error } ;  // Return an object containing data
};