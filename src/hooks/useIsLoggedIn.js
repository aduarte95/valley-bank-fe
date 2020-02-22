import { useState , useEffect } from "react";

//Login is the only page without navbar so this is needed to know where tho put it and not.
export const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
          
      }, []);

    return {
        isLoggedIn,
        setIsLoggedIn
    }
};