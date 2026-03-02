// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export function usePersistedState(key, initialValue) {
//     const [state, setState] = useState(initialValue);

//     useEffect(() => {
//         async function loadState() {
//             try {
//                 const storedValue = await AsyncStorage.getItem(key);

//                 if (!storedValue) {
//                     return;
//                 }

//                 setState(JSON.parse(storedValue));
//             } catch (error) {
//                 throw new Error("'Failed to load state'")
//             }
//         }

//         loadState();
//     }, [key]);

//     const setPersistedState = async (value) => {
//         try {
//             const valueToStore = value instanceof Function ? value(state) : value;

//             setState(valueToStore);
//             await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
//         } catch (error) {
//             throw new Error("Failed to save state")
//         }
//     };

//     return [state, setPersistedState];
// }

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePersistedState(key, initialValue) {
    const [state, setState] = useState(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        async function loadState() {
            try {
                const storedValue = await AsyncStorage.getItem(key);

                if (storedValue) {
                    setState(JSON.parse(storedValue));
                }
            } catch (error) {
                console.log("Failed to load state", error);
            } finally {
                setIsHydrated(true);
            }
        }

        loadState();
    }, [key]);

    const setPersistedState = async (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(state) : value;

            setState(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log("Failed to save state", error);
        }
    };

    return [state, setPersistedState, isHydrated];
}