import {useState, useEffect} from 'react'

const useGlobalContext = () =>{
    
    const [theme, setTheme] = useState<'light'|'dark'>(defaultValues.theme);
    
    useEffect(()=>{
        const lsTheme = localStorage.getItem('theme');
        //@ts-ignore
        if(lsTheme && ['dark', 'light'].includes(lsTheme)) setTheme(lsTheme);
    }, []);

    function changeTheme(to: typeof theme){
        if(to===theme) return;
        setTheme(to);
        localStorage.setItem('theme', to);
    }


    return({
        theme,
        changeTheme,
    });
}

export default useGlobalContext;

export const defaultValues:{
    theme: 'dark'|'light',
    changeTheme: (to: string)=>void;
}={
    theme: 'dark',
    changeTheme: (to: string)=>undefined,
}

export type globalContextType = ReturnType<typeof useGlobalContext>