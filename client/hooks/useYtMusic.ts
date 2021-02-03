import { useEffect, useRef } from 'react'

export default (videoID: string) =>{
    const audioRef = useRef(null);

    useEffect(()=>{
        if(!videoID) return;
        fetch('https://cors-anywhere.herokuapp.com/' + "https://www.youtube.com/get_video_info?video_id=" + videoID).then(response => {
        if (response.ok) {
            response.text().then(ytData0 => {
            
            let ytData = parse_str(ytData0);
            let getAdaptiveFormats = JSON.parse(ytData.player_response).streamingData.adaptiveFormats;
            let findAudioInfo = getAdaptiveFormats.findIndex(obj => obj.audioQuality);
            
            let audioURL = getAdaptiveFormats[findAudioInfo].url;
            
            let youtubeAudio = audioRef.current;
            if(!youtubeAudio) return;
            // @ts-ignore
            youtubeAudio.src = audioURL;
            
            });
        }
        });
    }, [videoID]);

    function parse_str(str){
        return str.split('&').reduce(function(params, param) {
            var paramSplit = param.split('=').map(function(value) {
            return decodeURIComponent(value.replace('+', ' '));
            });
            params[paramSplit[0]] = paramSplit[1];
            return params;
        }, {});
    }

    return{
        audioRef
    }
}   