import {StudentTypes} from 'vervalpd-node';
import {motion} from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export const StudentDetail: React.FC<{
    student: StudentTypes.Student;
}> = (props) => {
    return (
        <React.Fragment>
            <motion.div className="rounded-sm glass p-3 flex flex-row space-x-4 mt-3 md:w-1/2">
                <div className="avatar">
                    <div className="w-24 rounded-md">
                        <Image src={'https://nisn.data.kemdikbud.go.id/assets/images/student_icon.png'} alt={'Student Avatar'} fill sizes={'100vh'} />
                    </div>
                </div>
                <div className="flex-2">
                    <h1 className="text-lg font-bold text-left">{props.student.name} <span className="font-medium text-xs">({props.student.gender})</span></h1>
                    <p className='text-sm text-left'><span className="font-light">{props.student.grade} - SMA Negeri 3 Palu</span></p>
                    <div className="mt-2">
                        <p className="text-sm text-left">NISN: <span className="font-semibold">{props.student.nisn}</span></p>
                        <p className="text-sm text-left">NIK: <span className="font-semibold">{props.student.nik}</span></p>
                        <p className="text-sm text-left">Nama Ibu: <span className="font-semibold">{props.student.motherName}</span></p>
                        <p className="text-sm text-left">TTL: <span className="font-semibold">{props.student.born.place}, {props.student.born.date}</span></p>
                        <p className='text-xs text-left'>Data diambil pada {new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className="mt-2 flex space-x-2">
                        <a href={'/residu/'.concat(props.student.id)} className="text-blue-400 text-sm btn btn-sm">Lihat residu data</a>
                        <a href={'/detail/'.concat(props.student.id)} className="text-red-400 text-sm btn btn-sm">Lihat lebih detail</a>
                    </div>
                </div>
                <div className="hidden lg:block w-1/2">
                    <div className="avatar">
                        <div className="rounded-md w-32">
                            <Image src={'https://nisn.data.kemdikbud.go.id/qrcode/images/'.concat(props.student.id, '.png')} alt={'Student Avatar'} fill sizes={'100vh'} />
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div className="text-center mt-2">
                <p className="font-extralight text-sm">Ada data yang tidak sesuai? Segera lapor via <a href="https://instagram.com/@sman3palu.official" className="text-blue-400">Instagram</a> atau operator sekolah</p>
            </motion.div>
        </React.Fragment>
    )
}
