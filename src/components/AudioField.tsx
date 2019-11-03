import React from 'react';
import classNames from 'classnames';

type Ref = React.MutableRefObject<File>;

interface PropTypes {
  ref?: Ref;
}

enum Status {
  EMPY = 'EMPY',
  RECORDING = 'RECORDING',
  PLAYING = 'PLAYING',
  RECORDED = 'RECORDED',
}

const blobToFile = (theBlob: Blob, fileName: string): File => {
  var b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return theBlob as File;
};

const AudioField: React.FC<PropTypes> = React.forwardRef((props, ref: Ref) => {
  const {} = props;
  const [status, setStatus] = React.useState<Status>(Status.EMPY);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const recorderRef = React.useRef<MediaRecorder>();
  const chunksRef = React.useRef<Blob[]>([]);
  const audioRef = React.useRef<HTMLAudioElement>();

  const clean = () => {
    recorderRef.current = null;
    chunksRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setStatus(Status.EMPY);
  };

  const onData = (event: BlobEvent) => {
    chunksRef.current.push(event.data);
  };

  const onStopRecording = () => {
    const audioBlob = new Blob(chunksRef.current);
    const audioUrl = URL.createObjectURL(audioBlob);

    ref.current = new File([audioBlob], 'audio');
    audioRef.current = new Audio(audioUrl);
    setStatus(Status.RECORDED);
  };

  const onClick = () => {
    if (status === Status.RECORDED) {
      clean();
      return;
    }

    if (status === Status.RECORDING) {
      recorderRef.current.stop();
      recorderRef.current.stream.getAudioTracks().forEach(function(track) {
        track.stop();
      });
      recorderRef.current = null;
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      recorderRef.current = new MediaRecorder(stream);

      recorderRef.current.start();
      setStatus(Status.RECORDING);

      recorderRef.current.addEventListener('dataavailable', onData);
      recorderRef.current.addEventListener('stop', onStopRecording);
    });
  };

  const onStop = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const onPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.addEventListener('ended', onStop);
      setIsPlaying(true);
    }
  };

  const onRemove = () => {
    if (status === Status.RECORDED) {
      clean();
      return;
    }
  };

  const isRecording = status === Status.RECORDING;

  const className = classNames('border rounded-full p-4', {
    recording: isRecording,
    'bg-blue-100': isRecording,
  });

  const play = (
    <button
      type="button"
      onClick={onPlay}
      className="border rounded-full py-4 pl-5 pr-3"
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
      </svg>
    </button>
  );

  const stop = (
    <button type="button" className="border rounded-full p-4" onClick={onStop}>
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" />
      </svg>
    </button>
  );

  const remove = (
    <button
      type="button"
      className="border rounded-full p-4"
      onClick={onRemove}
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
      </svg>
    </button>
  );

  const record = (
    <button type="button" onClick={onClick} className={className}>
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M16 24h-8v-1h3.5v-3.018c-3.63-.256-6.5-3.287-6.5-6.982v-2h1v2.01c.005 3.307 2.692 5.99 6 5.99 3.311 0 6-2.689 6-6v-2h1v2c0 3.695-2.87 6.726-6.5 6.982v3.018h3.5v1zm-9-19c0-2.76 2.24-5 5-5s5 2.24 5 5v8c0 2.76-2.24 5-5 5s-5-2.24-5-5v-8zm9 0c0-2.208-1.792-4-4-4s-4 1.792-4 4v8c0 2.208 1.792 4 4 4s4-1.792 4-4v-8z" />
      </svg>
    </button>
  );

  return (
    <div className="flex justify-around">
      {(status === Status.EMPY || status === Status.RECORDING) && record}
      {status === Status.RECORDED && (isPlaying ? stop : play)}
      {status === Status.RECORDED && remove}
    </div>
  );
});

export default AudioField;
