// ==UserScript==
// @name         ScoreSaber OneClick install button
// @namespace    https://github.com/Invertex/
// @version      1.0
// @description  Add OneClick Install for BeatSaber songs on ScoreSaber
// @author       Invertex
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @match        https://scoresaber.com/leaderboard/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @connect      beatsaver.com
// ==/UserScript==

(function() {
    'use strict';

    let songInfoElem = document.querySelector("html body div.section div.container div.content div.columns.is-desktop.is-flex-reverse div.column.is-one-third-desktop div.box.has-shadow");
    let boldElems = songInfoElem.getElementsByTagName("B");

    if(boldElems.length > 0)
    {
        let songIDElem = boldElems[boldElems.length - 1];
        GetOneClickLink(songIDElem, SetupOneClickButton);
    }
})();


function GetOneClickLink(idElem, response)
{
    GM.xmlHttpRequest({
        method: "GET",
        url: "https://beatsaver.com/api/search/text/0?q=" + idElem.innerText,
        responseType: "json",
        headers: { "Content-type" : "application/json" },

        onload: function(e)
        {
            let results = e.response;

            if(results.totalDocs > 0)
            {
                var key = results.docs[0].key;
                response(idElem,"beatsaver://" + key, key);
            }
        }
    });
}

function SetupOneClickButton(idElem, clickUrl, key)
{
    var button = document.createElement("button");
    button.innerText = "OneClick™ Install";
    button.addEventListener("click", function() { window.location = clickUrl }, false);
    idElem.parentNode.appendChild(button);
    $(idElem).wrap("<a href='http://beatsaver.com/beatmap/" + key + "'></a>");
}