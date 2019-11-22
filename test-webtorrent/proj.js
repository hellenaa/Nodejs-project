const express = require('express');
const WebTorrent = require('webtorrent');

const app = express();

// Simple homepage to display the video.
app.get('/', (req, res) => {
    res.set('content-type', 'text/html');
    res.send(`
        <html>
            <head>
                <title>Big Buck Bunny</title>
                <style type="text/css">
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    video {
                        max-width: 640px;
                    }
                </style>
            </head>
            <body>
                <h1><a href=""/>Big Buck Bunny</a></h1>
                <video autoplay="autoplay">
                    <source src="/video" type="video/mp4" />
                </video>
            </body>
        </html>
    `);
});

app.get('/video', (req, res) => {
    res.set('content-type', 'video/mp4');
    res.set('content-disposition', 'inline');

    const client = new WebTorrent();

    // This can be any magnet URI, or a torrent file passed as text or a Buffer.

    // const bigBuckBunnyURI = 'magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big%20Buck%20Bunny&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F';
    const bigBuckBunnyURI = 'magnet:?xt=urn:btih:6D5018BA18371DF88487E88A8997A4E57A9002F2&tr=http%3A%2F%2Fbt4.t-ru.org%2Fann%3Fmagnet';

    client.add(bigBuckBunnyURI, function (torrent) {
        // You can easily sort through files within the torrent.
        const file = torrent.files.filter((file) => file.name === 'DuckTales the Movie. Treasure of the Lost Lamp.1990.WEBRip 1080p.mkv')[0];

        // The files can be piped to other streams.
        file.createReadStream().pipe(res);
    });
});

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
