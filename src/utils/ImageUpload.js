import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';

var Buffer = require('@craftzdog/react-native-buffer').Buffer;

const NEXT_PUBLIC_COGNITO_POOL_ID =
  'us-east-2:13b5a63e-0ef8-469b-9a38-91a7336c72bf';
const NEXT_PUBLIC_COGNITO_POOL_REGION = 'us-east-2';
const NEXT_PUBLIC_S3_BUCKET_NAME = 'reversedatingapp';

AWS.config.update({
  region: NEXT_PUBLIC_COGNITO_POOL_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: NEXT_PUBLIC_COGNITO_POOL_ID,
  }),
});

function getContentType(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
  };
  return mimeTypes[extension] || 'application/octet-stream';
}

export async function addFile(file, fileName, bucket) {
  const fileData = await RNFS.readFile(file, 'base64');
  const buffer = new Buffer(fileData, 'base64');
  const contentType = getContentType(fileName);

  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `${bucket}/${fileName}`,
      Body: buffer,
      ContentType: contentType,
      ServerSideEncryption: 'AES256',
    },
  });

  var promise = await upload.promise();
  promise.fileName = fileName;
  return promise;
}

export async function uploadFiles(files, bucket) {
  const promises = files.map(file => addFile(file.path, file.name, bucket));
  return Promise.all(promises);
}
