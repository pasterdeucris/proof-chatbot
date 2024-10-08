
const ffmpeg = require('fluent-ffmpeg'); 
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg'); 
ffmpeg.setFfmpegPath(ffmpegInstaller.path);


function convertOggToMp3(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('mp3')
        .on('error', (err) => reject(err))
        .on('end', () => resolve(outputPath))
        .save(outputPath);
    });
  }
  
async function transcribeAudio(filePath) {
    try {
      const fileStream = fs.createReadStream(filePath);
      fileStream.on('error', error => {
        console.error('Error reading file:', error);
      });
  
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        response_format: "text",
        language: "en",  // Specify English language for transcription
      });
  
      console.log('Transcription response:', transcription);
      return transcription
  
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }
  
  
  module.exports = {
    transcribeAudio,
    convertOggToMp3
  };
  
  
  //----------------------AUDIO THINGS----------------------