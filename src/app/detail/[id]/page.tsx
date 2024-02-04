'use server';
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

    const student = await verval.getProfile(params.id);
    if (!student) {
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

                <div className="tabs tabs-boxed tabs-md grid-cols-3 m-10 justify-center font-sans">
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 1" />
                    <div role="tabpanel" className="tab-content p-10">Tab content 1</div>

                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 2" checked />
                    <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
                    <div role="tabpanel" className="tab-content p-10">Tab content 3</div>    
                </div>
            </div>
        </main>
    )
}