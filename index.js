const DeepSpeech = require('deepspeech');
const fs = require('fs');
const Sox = require('sox-stream');
const MemoryStream = require('memory-stream');
const Duplex = require('stream').Duplex;
const Wav = require('node-wav');

module.exports = function (file) {

    var returnText;

    let modelPath = './models/deepspeech-0.9.3-models.pbmm';
    let scorerPath = './models/deepspeech-0.9.3-models.scorer';

    let model = new DeepSpeech.Model(modelPath);

    let desiredSampleRate = model.sampleRate();


    model.enableExternalScorer(scorerPath);

    let audioFile = file

    if (!fs.existsSync(audioFile)) {
        console.log('file missing:', audioFile);
        process.exit();
    }


    let audioStream = new MemoryStream();

    fs.createReadStream(file)
        .pipe(Sox({
            global: {
                'no-dither': true,
            },
            output: {
                bits: 16,
                rate: desiredSampleRate,
                channels: 1,
                encoding: 'signed-integer',
                endian: 'little',
                compression: 0.0,
                type: 'raw'
            }
        }))
        .pipe(audioStream);


    return new Promise((resolve, rej) => {
        audioStream.on('finish', () => {
            let audioBuffer = audioStream.toBuffer();

            const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
            console.log('audio length', audioLength);

            let result = model.stt(audioBuffer);

            console.log('result:', result);
            resolve(result)
        });
    })
};