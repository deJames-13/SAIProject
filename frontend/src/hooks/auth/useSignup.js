import { useState } from 'react';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            // Replace with your signup logic
            // Example: await authService.signup(email, password);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return { signup, loading, error };
};

export default useSignup;