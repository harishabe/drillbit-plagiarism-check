import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Role } from "../../constant/data";
import PageChange from '../../components/loader/PageChange';
import ReactDOM from 'react-dom';
import { setItemSessionStorage, getItemSessionStorage } from '../../utils/RegExp'

const SingleSignOn = () => {
  const router = useRouter();
  const [loadingPage, isLoadingPage] = useState(true)
  const [loginState, isLoginState] = useState([])

  if (getItemSessionStorage('role') && getItemSessionStorage('token') && getItemSessionStorage('email') && getItemSessionStorage('name')) {
    isLoadingPage(false)
  }

  useEffect(() => {
    if (loadingPage) {
      isLoginState({
        'role': router?.query?.role,
        'token': router?.query?.token,
        'username': router?.query?.username,
        'name': router?.query?.name,
        'message': router?.query?.message
      })
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
      setItemSessionStorage("role", Role.admin);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/extream/admin/dashboard?message=${loginState?.message}`);
    } else if (loginState?.role === Role.instructor) {
      setItemSessionStorage("role", Role.instructor);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/extream/instructor/dashboard?message=${loginState?.message}`);
    } else if (loginState?.role === Role.student) {
      setItemSessionStorage("role", Role.student);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/extream/student/dashboard?message=${loginState?.message}`);
    } else if (loginState?.role === Role.proAdmin) {
      setItemSessionStorage("role", Role.proAdmin);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/pro/admin/dashboard?message=${loginState?.message}`);
    } else if (loginState?.role === Role.proUser) {
      setItemSessionStorage("role", Role.proUser);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/pro/user/dashboard?message=${loginState?.message}`);
    } else if (loginState?.role === Role.super) {
      setItemSessionStorage("role", Role.super);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/super/dashboard?message=${loginState?.message}`);
    } else if (loginState?.role === Role.supplier) {
      setItemSessionStorage("role", Role.supplier);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      setItemSessionStorage("SSO", true);
      router.push(`/supplier/dashboard?message=${loginState?.message}`);
    }
  }, [router, loginState]);

};

export default SingleSignOn;
