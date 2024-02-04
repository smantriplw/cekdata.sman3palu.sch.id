'use server';

import { verval } from "@/libraries/vervalpd";
import { randomUUID } from "crypto";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
    if (params.id.split('-').filter(x => x.length).length !== 5) {
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

    const student = await verval.findResidu(params.id);

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
                    <h1 className="text-4xl font-sans font-semibold">
                        Data peserta didik ini memiliki residu
                    </h1>
                </div>
            )}
        </main>
    )
}