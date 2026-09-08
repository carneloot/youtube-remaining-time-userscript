// ==UserScript==
// @name         YouTube Remaining Time at Playback Speed
// @namespace    https://github.com/carneloot/youtube-remaining-time-userscript
// @version      1.0.1
// @description  Shows the video's remaining playback time, adjusted for the active playback speed.
// @homepageURL  https://github.com/carneloot/youtube-remaining-time-userscript
// @downloadURL  https://raw.githubusercontent.com/carneloot/youtube-remaining-time-userscript/main/youtube-remaining-time.user.js
// @updateURL    https://raw.githubusercontent.com/carneloot/youtube-remaining-time-userscript/main/youtube-remaining-time.user.js
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @grant        none
// @run-at       document-idle
// @license       MIT
// ==/UserScript==

(function () {
  'use strict';

  const DISPLAY_ID = 'yt-speed-adjusted-remaining-time';
  const REFRESH_INTERVAL_MS = 1000;
  let observedVideo;

  function formatDuration(seconds) {
    const totalSeconds = Math.max(0, Math.ceil(seconds));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
      : `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  function getDisplay() {
    return document.getElementById(DISPLAY_ID);
  }

  function render() {
    const display = getDisplay();
    const video = document.querySelector('video.html5-main-video');

    if (!display || !video || !Number.isFinite(video.duration) || video.duration <= 0) {
      if (display) display.hidden = true;
      return;
    }

    const playbackRate = video.playbackRate || 1;
    const realTimeRemaining = (video.duration - video.currentTime) / playbackRate;

    display.textContent = `−${formatDuration(realTimeRemaining)}`;
    display.title = `${formatDuration(realTimeRemaining)} remaining at ${playbackRate}× speed`;
    display.hidden = false;
  }

  function addDisplay() {
    const timer = document.querySelector('.ytp-time-display');
    if (!timer || getDisplay()) return;

    const display = document.createElement('span');
    display.id = DISPLAY_ID;
    display.className = 'ytp-time-display ytp-time-current';
    display.style.marginRight = '12px';
    display.style.fontVariantNumeric = 'tabular-nums';
    display.style.cursor = 'default';
    timer.insertAdjacentElement('afterend', display);
  }

  function observeVideo() {
    const video = document.querySelector('video.html5-main-video');
    if (!video || video === observedVideo) return;

    observedVideo = video;
    for (const eventName of ['durationchange', 'ratechange', 'loadedmetadata', 'timeupdate']) {
      video.addEventListener(eventName, render);
    }
  }

  function refresh() {
    addDisplay();
    observeVideo();
    render();
  }

  window.addEventListener('yt-navigate-finish', refresh);
  window.setInterval(refresh, REFRESH_INTERVAL_MS);
  refresh();
})();
