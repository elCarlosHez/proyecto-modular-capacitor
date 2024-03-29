import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFindPath = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState<string>();
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);
    return currentPath;
};
