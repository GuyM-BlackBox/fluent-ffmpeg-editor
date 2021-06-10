const ffmpeg = require('fluent-ffmpeg');

function logVideoInfo (inputFile) {
    ffmpeg.ffprobe(inputFile, (err, metaData) => {
        console.log('Video: ', inputFile, '\n',metaData); 
    });
}

function trimVideo (inputVideoFile, outputVideoFile, startingTime, clipDuration){
    ffmpeg.ffprobe(inputVideoFile, (err, metaData) => {
        const duration = parseInt(metaData.format.duration);
        if(startingTime < 0){
            console.log('ERROR: Trimming Boundaries Before Video!');
            startingTime = 0;
        }
        if(duration < startingTime + clipDuration){
            console.log('ERROR: Trimming Boundaries Outside Video!');
            clipDuration = duration-startingTime;
        }
        console.log('Vid Duration: ', duration, ' - Start: ',startingTime, ' - Duration: ',clipDuration);
        ffmpeg()
            .input(inputVideoFile)
            .inputOptions([ `-ss ${startingTime}` ])
            .outputOptions([ `-t ${clipDuration}` ])
            .noAudio()
            .output(outputVideoFile)
            .on('end', () => console.log('Trim Done!'))
            .on('err', (err) => console.log(err))
            .run();
    });
}

function mergeVideos ( inputVideoFile1, inputVideoFile2, outputVideoFile, tempFile){
    ffmpeg(inputVideoFile1)
        .input(inputVideoFile2)
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
            console.log('Merge Done!');
        })
        .mergeToFile(outputVideoFile, tempFile);
}

function convertToMp4(videoFile, output){
    ffmpeg(videoFile)
        .on('error', function(err) { console.log('An error occurred: ' + err.message);})
        .on('end', function() {console.log('Save Done!');})
        .save(output)
}

function videoPreview(videoFile, timestamps, output){
    ffmpeg('./videos/web1.mp4')
        .screenshots({
        timestamps: timestamps,
        filename: 'thumbnail-at-%s-seconds.png',
        folder: output
        });
}

var videoFile = './videos/web1.mp4'
var timestamps = [3, '75%', '00:06.675']
var output = './videos/thumbnails/'
//videoPreview(videoFile, timestamps, output)


const web1 = './videos/web1.webm';
const web2 = './videos/web2.webm';
//convertToMp4(web1,'./videos/web1.mp4')
//convertToMp4(web2,'./videos/web2.mp4')

const mountainVideo = './videos/mountain.mp4';
const flowerVideo = './videos/flower.mp4';
const rainVideo = './videos/rain.mp4';
//logVideoInfo(mountainVideo);
//logVideoInfo(flowerVideo);
//logVideoInfo(rainVideo);

const vid1 = './videos/vid1.mov';
const vid2 = './videos/vid2.mov';
const outVid = './videos/outVid.mov';
const tempVid = './videos/outVid/temp';
//logVideoInfo(vid1);
//logVideoInfo(vid2);
//mergeVideos ( vid1, vid2, outVid, tempVid);

const inputVideoFile = './videos/flower.mp4';
const outputVideoFile1 = './videos/trim_flower1.mp4';
const outputVideoFile2 = './videos/trim_flower2.mp4';
//trimVideo (inputVideoFile, outputVideoFile1, 0, 3);
//trimVideo (inputVideoFile, outputVideoFile2, 3, 10);

const inputVideoFile1 = './videos/mountain.mp4';
const inputVideoFile2 = './videos/flower.mp4';
const outputVideoFile = './videos/new_vid4.mp4';
const tempFile = './videos/new_vid4/temp';
//mergeVideos ( outputVideoFile1, outputVideoFile2, outputVideoFile, tempFile);
//*/