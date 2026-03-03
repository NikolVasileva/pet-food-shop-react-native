import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export function useSecureState(key, initialValue) {
    const [state, setState] = useState(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        async function loadState() {
            try {
                const storedValue = await SecureStore.getItemAsync(key)
                console.log("SecureStore methods:", Object.keys(SecureStore));
                console.log(storedValue)

                if (storedValue != null) {
                    setState(JSON.parse(storedValue));
                }
            } catch (error) {
                console.error("Failed to load state", error);

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
            await SecureStore.setItemAsync(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Failed to load state", error);
        }
    };

    return [state, setPersistedState, isHydrated];
}