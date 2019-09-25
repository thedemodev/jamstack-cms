import { Storage } from 'aws-amplify'
import config from '../../jamstack-config.js'
import uuid from 'uuid/v4'
import { getCleanedFileName } from './helpers'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

function saveFile(file) {
  return new Promise(async(resolve) => {
    const { name: fileName, type: mimeType } = file
    const cleanedFileName = getCleanedFileName(fileName)
    const key = `images/${uuid()}_${cleanedFileName}`      
    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
    try {
      await Storage.put(key, file, {
        contentType: mimeType
      })
      resolve({ key, url }) 
    } catch (err) {
      console.log('error: ', err)
    }
  })
}

export default saveFile