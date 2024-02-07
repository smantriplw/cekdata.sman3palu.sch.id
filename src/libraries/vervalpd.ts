import { existsSync, writeFileSync } from "fs";
import { VervalPd } from "vervalpd-node";
import { CookieFileConsumer } from 'vervalpd-node/dist/cookie-file-consumer';

if (!existsSync('/tmp/vervalpd-cookies')) {
    writeFileSync('/tmp/vervalpd-cookies', '');
}

export const verval = new VervalPd({
    email: process.env.DAPODIK_USERNAME ?? '',
    password: process.env.DAPODIK_PASSWORD ?? '',
}, {
    cookieInstance: new CookieFileConsumer('/tmp/vervalpd-cookies'),
});
