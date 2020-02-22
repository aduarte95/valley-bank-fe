import { useState , useEffect } from "react";

//Login is the only page without navbar so this is needed to know where tho put it and not.
export const useIsLoginPage = () => {
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {
          
      }, []);

    return {
        isLoginPage,
        setIsLoginPage
    }
};