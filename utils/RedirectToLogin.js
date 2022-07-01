import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectToLogin = ({
    error
}) => {
    const router = useRouter();
    useEffect(() => {
        router.push({
            pathname: '/auth/login'
        });
    }, [error]);
};

export default RedirectToLogin;