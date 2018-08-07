var videoPlayer = document.querySelector('#player');
var canvasElement = document.querySelector('#canvas');
var captureButton1 = document.querySelector('#pic1');
var captureButton2 = document.querySelector('#pic2');
var captureButton3 = document.querySelector('#pic3');
var captureButton4 = document.querySelector('#pic4');


let xs,ys;


var context;
navigator.mediaDevices.getUserMedia({video: true})
    .then(function (stream) {
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = 'block';
    })
    .catch(function (err) {
      console.log(err);
    });

inputData=[]
inputlable=[]
captureButton1.addEventListener('click', function (event) {
    context = canvasElement.getContext('2d');
    context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
    imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    inputData.push(Array.from(imgData.data));
    inputlable.push(1)
});

captureButton2.addEventListener('click', function (event) {
    context = canvasElement.getContext('2d');
    context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
    imgData = context.getImageData(0, 0, canvas.width, canvas.height);

    inputData.push(Array.from(imgData.data));
    inputlable.push(0)
    
    
});

captureButton3.addEventListener('click', function (event) {

    console.log(inputData);
    console.log(inputlable);
    xs = tf.tensor(inputData);
    ys = tf.tensor1d(inputlable);
    train();
    
});

captureButton4.addEventListener('click', function (event) {

  context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
  imgData = context.getImageData(0, 0, canvas.width, canvas.height);


  const input = tf.tensor2d([
    Array.from(imgData.data)
  ]);
  let results = model.predict(input);
  let argMax = results.argMax(1);
  let index = argMax.dataSync()[0];
  console.log(index);
  
});

async function train(){
  xs = tf.tensor2d(inputData);
  let labelsTensor = tf.tensor1d(inputlable, 'int32');
  ys = tf.oneHot(labelsTensor, inputData.length).cast('float32');

  model = buildModel();

  await model.fit(xs, ys, {
    shuffle: true,
    validationSplit: 0.1,
    epochs: 10,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(epoch);
        console.log('Loss: ' + logs.loss.toFixed(5));
      },
      onBatchEnd: async (batch, logs) => {
        await tf.nextFrame();
      },
      onTrainEnd: () => {
        istraining = false;
        console.log('finished');
      },
    },
  });
  }
//dense_Dense1_input

  function buildModel() {
    let md = tf.sequential();
    const hidden = tf.layers.dense({
      units: inputData.length,
      inputShape: [40000],
      activation: 'sigmoid'
    });
  
    const output = tf.layers.dense({
      units: inputData.length,
      activation: 'softmax'
    });
    md.add(hidden);
    md.add(output);
  
    const LEARNING_RATE = 0.25;
    const optimizer = tf.train.sgd(LEARNING_RATE);
  
    md.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  
    return md
  }
