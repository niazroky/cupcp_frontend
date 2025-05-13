
// src\components\ExamRegFormHelper\useExamRegistration.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import apiRoutes from '../../api/apiRoute';


export default function useExamRegistration() {
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [regData, setRegData] = useState(null);
  const [userInfo, setUserInfo] = useState({ full_name: '', varsity_id: '', session: '', phone_number: '' });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(apiRoutes.myExamRegistration, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setRegistered(data.registered);
        const info = data.registered ? data.registration : data.user;
        setRegData(data.registration || null);
        setUserInfo({
          full_name: info.full_name,
          varsity_id: info.varsity_id,
          session: info.session,
          phone_number: info.phone_number,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { loading, registered, regData, userInfo, setRegistered, setRegData };
}
