import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Role } from "../../constant/data";
import { setItemSessionStorage } from "../../utils/RegExp";
import PageChange from '../../components/loader/PageChange';

const Lti = () => {
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.role === Role.admin) {
      setItemSessionStorage("role", Role.admin);
      setItemSessionStorage("token", router?.query?.token);
      setItemSessionStorage("email", router?.query?.username);
      setItemSessionStorage("name", router?.query?.name);
      setItemSessionStorage("switchRole", "instructor");
      router.push(`/extream/instructor/myclasses?message=${router?.query?.message}`);
    } else if (router?.query?.role === Role.instructor) {
      setItemSessionStorage("role", Role.instructor);
      setItemSessionStorage("token", router?.query?.token);
      setItemSessionStorage("email", router?.query?.username);
      setItemSessionStorage("name", router?.query?.name);
      router.push(`/extream/instructor/myclasses?message=${router?.query?.message}`);
    } else if (router?.query?.role === Role.student) {
      setItemSessionStorage("role", Role.student);
      setItemSessionStorage("token", router?.query?.token);
      setItemSessionStorage("email", router?.query?.username);
      setItemSessionStorage("name", router?.query?.name);
      router.push(`/extream/student/myclasses?message=${router?.query?.message}`);
    } else if (router?.query?.role === Role.proAdmin) {
      setItemSessionStorage("role", Role.proAdmin);
      setItemSessionStorage("token", router?.query?.token);
      setItemSessionStorage("email", router?.query?.username);
      setItemSessionStorage("name", router?.query?.name);
      setItemSessionStorage("switchProRole", "user");
      router.push(`/pro/user/myfolder?message=${router?.query?.message}`);
    } else if (router?.query?.role === Role.proUser) {
      setItemSessionStorage("role", Role.proUser);
      setItemSessionStorage("token", router?.query?.token);
      setItemSessionStorage("email", router?.query?.username);
      setItemSessionStorage("name", router?.query?.name);
      router.push(`/pro/user/myfolder?message=${router?.query?.message}`);
    }
  }, [router]);

  return <PageChange />;
};

export default Lti;
