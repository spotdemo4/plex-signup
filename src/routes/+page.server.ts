import type { Actions } from './$types';
import xml2js from 'xml2js';
import { PLEX_USER, PLEX_PASS, PLEX_SERVER_ID, PLEX_LIBRARY_SECTION_IDS } from '$env/static/private';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        let email = data.get('email');

        let signin_response = await fetch('https://plex.tv/api/v2/users/signin', {
            method: 'POST',
            body: JSON.stringify({
                "login": PLEX_USER,
                "password": PLEX_PASS,
                "rememberMe": true,
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Plex-Client-Identifier': 'PlexSignup',
            },
        });

        if (signin_response.status != 201) {
            return {
                success: false,
                body: 'Error, could not sign in!',
            };
        }

        let token = (await xml2js.parseStringPromise(await signin_response.text()))['user']['$']['authToken'];

        let share_response = await fetch(`https://plex.tv/api/servers/${PLEX_SERVER_ID}/shared_servers`, {
            method: 'POST',
            body: JSON.stringify({
                "server_id": PLEX_SERVER_ID,
                "shared_server": {
                    "library_section_ids": `[${PLEX_LIBRARY_SECTION_IDS}]`,
                    "invited_email": email
                }
            }),
            headers: {
                'Content-Type': 'application/json', 
                'X-Plex-Token': token
            },
        });

        if (share_response.status == 200) {
            console.log(`Shared ${PLEX_SERVER_ID} with ${email}`)

            return {
                success: true,
                body: 'Success!',
            };
        } else {
            return {
                success: false,
                body: 'Error, could not share!',
            };
        }
    }
} satisfies Actions;