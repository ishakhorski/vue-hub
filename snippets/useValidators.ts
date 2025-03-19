const useValidators = () => {
    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    return {
        validateEmail
    }
};

export default useValidators;