'use server';
import { StudentContents } from "@/components/students/studentContents";
import { verval } from "@/libraries/vervalpd";
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

    const student = await verval.getProfile(params.id).catch(() => undefined);
    if (!student?.name.length) {
        return (
            <main>
                <h1 className="text-center text-4xl font-sans font-semibold">
                    ID tidak ditemukan
                </h1>
                <p className="text-center text-wrap font-light">
                    ID yang dimasukkan tidak ditemukan. Silahkan cek kembali ID yang dimasukkan.
                </p>
                <div className="text-center mt-3">
                    <Link href={'/'} className="text-blue-500 hover:underline">Kembali ke halaman utama</Link>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className="text-center">
                <h1 className="text-2xl font-sans font-bold">
                    {student.name} &apos;s information
                </h1>
                <p className="font-sans font-light text-lg">
                    <span className="font-sans font-medium">{student.nisn}</span> - {student.born.place}, {student.born.date} {student.nationality}
                </p>

                <StudentContents student={{
                    ...student,
                    motherName: student.motherName.slice(0, 1) + '*'.repeat(student.motherName.slice(1).length),
                    nik: student.nik ? `${student.nik.slice(0, 5)}${'*'.repeat(student.nik.slice(0, -5).length)}` : '-',
                    akta: `${student.akta.split('/').map(x => x.slice(0, 2) + '*'.repeat(x.slice(0, -2).length)).join('/')}`,
                }} />
                <div>
                    <p className="font-light font-sans text-sm">
                        Data diambil pada {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </main>
    )
}