export const verifyCaptcha = async (token: string, ip?: string) => {
    if (typeof token !== 'string' || !token.length) {
        return undefined;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET ?? '',
            response: token,
            remoteip: ip ?? '',
        }),
    });

    const json = await response.json();
    return {
        data: json.challenge_ts,
        ok: json.success,
        error: json['error-codes']?.join(', ') ?? '',
    }
}