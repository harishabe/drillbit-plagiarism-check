import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Role } from "../../constant/data";
import PageChange from '../../components/loader/PageChange';
import ReactDOM from 'react-dom';

const SingleSignOn = () => {
  const router = useRouter();
  const [loadingPage, isLoadingPage] = useState(true)
  const [loginState, isLoginState] = useState([])

  if (localStorage.getItem('role') && localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('name')) {
    isLoadingPage(false)
  }

  useEffect(() => {
    if (loadingPage) {
      isLoginState({
        'role': router?.query?.role,
        'token': router?.query?.token,
        'username': router?.query?.username,
        'name': router?.query?.name
      })
      if (router?.query?.token === undefined) {
        router.push('/auth/login');
      }
      document.body.classList.add('body-page-transition');
      ReactDOM.render(
        <PageChange />,
        document.getElementById('page-transition')
      );
    }
    else {
      ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
      document.body.classList.remove('body-page-transition');
    }
  }, [router, loadingPage])

  useEffect(() => {
    if (loginState?.role === Role.admin) {
      localStorage.setItem("role", Role.admin);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/extream/admin/dashboard");
    } else if (loginState?.role === Role.instructor) {
      localStorage.setItem("role", Role.instructor);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/extream/instructor/dashboard");
    } else if (loginState?.role === Role.student) {
      localStorage.setItem("role", Role.student);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/extream/student/dashboard");
    } else if (loginState?.role === Role.proAdmin) {
      localStorage.setItem("role", Role.proAdmin);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/pro/admin/dashboard");
    } else if (loginState?.role === Role.proUser) {
      localStorage.setItem("role", Role.proUser);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/pro/user/dashboard");
    } else if (loginState?.role === Role.super) {
      localStorage.setItem("role", Role.super);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/super/dashboard");
    } else if (loginState?.role === Role.supplier) {
      localStorage.setItem("role", Role.supplier);
      localStorage.setItem("token", loginState?.token);
      localStorage.setItem("email", loginState?.username);
      localStorage.setItem("name", loginState?.name);
      router.push("/supplier/extreamProduct");
    }
  }, [router, loginState]);

};

export default SingleSignOn;
