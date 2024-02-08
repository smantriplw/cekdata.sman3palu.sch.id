'use client';

import React from "react";
import type { StudentTypes } from "vervalpd-node";

export const StudentContents: React.FC<{
    student?: StudentTypes.StudentExtra;
}> = (props) => {
    return (
        <main>
            <div className="tabs tabs-boxed tabs-md grid-cols-3 m-10 justify-center font-sans">
                    <input type="radio" name="student_tab" role="tab" className="tab" aria-label="Data" defaultChecked />
                    <div role="tabpanel" className="tab-content p-10 text-left">
                        <ul>
                            <li>
                                <span className="font-sans font-semibold mr-2">NIK :</span>
                                {props.student?.nik}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">AKTA :</span>
                                {props.student?.akta}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Alamat :</span>
                                {props.student?.address}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Transportasi :</span>
                                {props.student?.transportation}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Nama Ibu Kandung :</span>
                                {props.student?.motherName}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Nomor Telepon :</span>
                                {props.student?.phone}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Cita-cita :</span>
                                {props.student?.wishes}
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Jarak ke sekolah / Estimasi waktu :</span>
                                {props.student?.homeDistance} KM / {props.student?.estimatedToSchool} menit
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Berat Badan :</span>
                                {props.student?.mass} kg
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Tinggi Badan :</span>
                                {props.student?.height} cm
                            </li>
                            <li>
                                <span className="font-sans font-semibold mr-2">Hobi :</span>
                                {props.student?.hobby}
                            </li>
                        </ul>
                    </div>

                    <input type="radio" name="student_tab" role="tab" className="tab" aria-label="Kesehatan" />
                    <div role="tabpanel" className="tab-content p-10">
                        <div className="flex flex-col lg:flex-row w-full">
                            {props.student?.vaccines.map(vaccine => (
                                <React.Fragment key={vaccine.date.toString()}>
                                    <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                                        <span className="font-semibold">{vaccine.service}</span> {vaccine.type} pada {vaccine.date.toLocaleDateString('id-ID', {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        })} dosis ke-{vaccine.dosed} di {vaccine.place}
                                    </div>
                                    {props.student?.vaccines.at(-1) !== vaccine && <div className="divider lg:divider-horizontal"></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <input type="radio" name="student_tab" role="tab" className="tab" aria-label="BK/BP" />
                    <div role="tabpanel" className="tab-content p-10">
                        Coming soon...
                    </div>    
            </div>
        </main>
    )
}