'use server';

import { verval } from "@/libraries/vervalpd";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const ResiduItem: React.FC<{
    name: string;
    correct: number;
}> = (props) => (
    <p className={twMerge('font-sans', 'text-md', 'font-light', props.correct < 90 ? 'text-red-500' : 'text-green-500')}>
        {props.name}
        <span className={twMerge(props.correct < 90 ? 'font-semibold' : 'font-light', 'ml-2')}>
            {props.correct < 90 ? 'BERMASALAH' : 'AMAN'}
        </span>
    </p>
)

export default async function Page({ params }: { params: { id: string } }) {
    if (params.id.length !== 10 && !Number.isNaN(params.id)) {
        return (
            <main>
                <h1 className="text-center text-4xl font-sans font-semibold">
                    ID tidak valid
                </h1>
                <p className="text-center text-wrap font-light">
                    ID yang dimasukkan tidak valid. Silahkan cek kembali ID yang dimasukkan.
                </p>
                <div className="text-center mt-3">
                    <Link href={'/'} className="text-blue-500 hover:underline">Kembali ke halaman utama</Link>
                </div>
            </main>
        )
    }

    const student = await verval.findResidu(params.id.split('').reverse().join(''));

    return (
        <main className="text-center h-screen w-full flex flex-col justify-center items-center">
            {!student.length ? (
                <div className="text-center">
                    <h1 className="text-2xl font-sans font-semibold text-green-400">
                        Selamat! Data peserta didik ini tidak memiliki kesalahan atau residu
                    </h1>
                    <p className="text-md font-light">
                        Data NIK, NIS, Nama Ibu Kandung, TTL, dan Alamat yang terdaftar telah sesuai dengan DUKCAPIL. Jika ada kesalahan silahkan hubungi operator sekolah ^_
                    </p>
                    <div className="mt-3">
                        <Link href={'/'} className="text-blue-500 hover:underline">Kembali ke halaman utama</Link>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-2xl font-sans font-semibold">
                        <span>Atas nama {student[0].name}</span><br />
                        <span className="font-extrabold font-sans text-red-500">Maaf</span>, data peserta didik ini memiliki data yang residu
                    </h1>
                    <p className="text-lg font-light">
                        Berikut kelengkapan data:
                        <div className="mt-3">
                            <ResiduItem name={'Validitas NIK'} correct={student[0].nikResidu?.text === 'NIK Ditemukan' ? 100 : student[0].nikResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Nama Ibu'} correct={student[0].motherResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Nama'} correct={student[0].nameResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Jenis Kelamin'} correct={student[0].genderResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Tempat Lahir'} correct={student[0].bornPlaceResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Tanggal Lahir'} correct={student[0].bornDateResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Rombel/Kelas'} correct={student[0].rombelResidu?.text === 'Unik' ? 100 : student[0].rombelResidu?.similarity ?? 0} />
                            <ResiduItem name={'Validitas Tempat Tinggal'} correct={student[0].villageResidu?.similarity ?? 0} />
                        </div>
                        <p className="text-sm py-4">
                            Segera melapor pada operator sekolah
                        </p>
                    </p>
                </div>
            )}
        </main>
    )
}