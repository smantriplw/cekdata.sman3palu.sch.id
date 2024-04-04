import { verifyCaptcha } from "@/libraries/verifyCaptcha";
import { verval } from "@/libraries/vervalpd";
import { NextRequest, NextResponse as Response } from "next/server";

export async function GET(request: NextRequest) {
    const captchaVerify = await verifyCaptcha(request.nextUrl.searchParams.get('token') ?? '', request.ip);
    if (!captchaVerify) {
        return Response.json({
            error: 'Captcha verification failed',
        }, {
            status: 400,
        });
    }

    if (!captchaVerify.ok) {
        return Response.json(captchaVerify, {
            status: 400,
        });
    }

    const motherName = request.nextUrl.searchParams.get('mother');
    if (!motherName) {
        return Response.json({
            error: 'Mother name is required',
        }, {
            status: 400,
        });
    }

    const url = new URL(request.nextUrl);
    const nisn = url.pathname.split('/').at(3);

    if (!nisn) {
        return Response.json({
            error: 'NISN is required',
        }, {
            status: 400,
        });
    }

    if (nisn.length !== 10) {
        return Response.json({
            error: 'NISN must be 10 characters long',
        }, {
            status: 400,
        });
    }

    if (!/^\d+$/.test(nisn)) {
        return Response.json({
            error: 'NISN must be a number',
        }, {
            status: 400,
        });
    }

    const students = await verval.findStudent(nisn).catch((e) => {
	    console.log(e);
	    return null;
    });
    if (!students?.length || students[0].motherName.toLowerCase() !== motherName.toLowerCase()) {
        return Response.json({
            error: 'Student not found',
        }, {
            status: 404,
        });
    }

    const student = students[0];

    return Response.json({
        ok: true,
        data: {
            ...student,
            motherName: student.motherName.slice(0, 1) + '*'.repeat(student.motherName.slice(1).length),
            nik: student.nik ? `${student.nik.slice(0, 5)}${'*'.repeat(student.nik.slice(0, -5).length)}` : null,
        },
    });
}
