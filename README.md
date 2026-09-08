# YouTube remaining time at playback speed

A Violentmonkey userscript that shows how much real time remains in a YouTube video at the active playback speed.

![YouTube player showing the native timer followed by a speed-adjusted remaining-time label](images/youtube-remaining-time.png)

At 2× speed, a 3:33 video shows `−1:47` remaining instead of `−3:33`. At 1× speed, the extra label stays hidden.

## Install

1. Install the [Violentmonkey browser extension](https://violentmonkey.github.io/).
2. Open [youtube-remaining-time.user.js](https://raw.githubusercontent.com/carneloot/youtube-remaining-time-userscript/main/youtube-remaining-time.user.js).
3. Confirm the installation in Violentmonkey.

The script updates the displayed time when you change YouTube's playback speed. Violentmonkey checks the same URL for newer versions.

## License

[MIT](LICENSE)
