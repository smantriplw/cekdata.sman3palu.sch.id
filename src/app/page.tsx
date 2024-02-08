'use client';

import { StudentDetail } from '@/components/students/studentDetail';
import {motion} from 'framer-motion';
import { useReCaptcha } from 'next-recaptcha-v3';
import React from 'react';
import toast from 'react-hot-toast';
import type { StudentTypes } from 'vervalpd-node';

export default function Home() {
  const recaptcha = useReCaptcha();
  const [nisn, setNisn] = React.useState<string>('');
  const [mother, setMother] = React.useState<string>('');
  const [student, setStudent] = React.useState<StudentTypes.Student>();

  if (recaptcha.error) {
    console.error('reCapthca fail to load');
  }

  const handleNisnSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(async (event) => {
    event.preventDefault();
    setStudent(undefined);

    const toastLoadingId = toast.loading("Mohon tunggu", {
      className: 'text-md font-sans font-semibold',
    });

    const token = await recaptcha.executeRecaptcha('nisn_check');
    const url = new URL('/api/students/'.concat(encodeURIComponent(nisn ?? '')), location.origin);
    url.searchParams.set('token', token);
    url.searchParams.set('mother', mother ?? '');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    });

    const data = await response.json();
    if (data.error) {
      toast.dismiss(toastLoadingId);
      toast.error(data.error, {
        className: 'text-md font-sans font-semibold',
        duration: 5000,
      });
    }

    if (data.data) {
      toast.dismiss(toastLoadingId);
      setStudent(data.data);
    }
  }, [recaptcha, nisn, mother]);
  return (
    <motion.div className="text-center h-screen w-full flex flex-col justify-center items-center" animate={{
      x: 0,
    }}>
      <motion.h1 className="text-4xl font-bold">
        Cek Data <span className="text-blue-400">SMAN 3 Palu</span>
      </motion.h1>
      <motion.p className="text-md text-wrap md:w-1/2">
        Cek data siswa SMAN 3 Palu secara realtime dengan memasukkan NISN siswa yang ingin dicari. Data yang ditampilkan adalah data yang terdaftar di server Kementerian Pendidikan dan Kebudayaan.
      </motion.p>
      <motion.form className="md:w-1/2" action="#" onSubmit={handleNisnSubmit}>
        <div className="form-control">
          <div className="label">
            <span className="label-text">
              NISN dan Nama Ibu
            </span>
          </div>
          <div className="join">
            <input type="text" required placeholder='NISN' className="join-item input input-bordered w-full md:w-11/12" value={nisn} onChange={(ev) => setNisn(ev.target.value)} />
            <input type="text" required placeholder='Nama Ibu' className="join-item input input-bordered w-full md:w-11/12" value={mother} onChange={(ev) => setMother(ev.target.value)} />
            <button type="submit" className="join-item btn btn-primary">Cek Data</button>
          </div>
          <div className="label">
            <span className="label-text-alt">
              Nomor Induk Siswa Nasional dan Nama Ibu Kandung
            </span>
          </div>
        </div>
      </motion.form>
      {student && <StudentDetail student={student} />}
    </motion.div>
  );
}
