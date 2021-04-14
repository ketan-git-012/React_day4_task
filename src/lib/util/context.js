import { createContext } from 'react';

const CustomeSnack = createContext();

const CustomSpineer = createContext({
    loading : false,
    setLoading : () => {}
})

export { 
    CustomeSnack,
    CustomSpineer
}