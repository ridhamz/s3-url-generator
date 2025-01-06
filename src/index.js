// Package: aws-s3-url-generator
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class S3UrlGenerator {
  constructor(config = {}) {
    this.s3Client = new S3Client(config);
  }

  /**
   * Generate a pre-signed URL for downloading a file from S3
   * @param {string} bucket - S3 bucket name
   * @param {string} key - S3 object key
   * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
   * @returns {Promise<string>} Pre-signed URL
   */
  async getDownloadUrl(bucket, key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      throw new Error(`Failed to generate download URL: ${error.message}`);
    }
  }

  /**
   * Generate a pre-signed URL for uploading a file to S3
   * @param {string} bucket - S3 bucket name
   * @param {string} key - S3 object key
   * @param {string} contentType - File content type
   * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
   * @returns {Promise<string>} Pre-signed URL
   */
  async getUploadUrl(bucket, key, contentType, expiresIn = 3600) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      throw new Error(`Failed to generate upload URL: ${error.message}`);
    }
  }

  /**
   * Generate multiple pre-signed URLs for downloading files
   * @param {string} bucket - S3 bucket name
   * @param {string[]} keys - Array of S3 object keys
   * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
   * @returns {Promise<{[key: string]: string}>} Object mapping keys to URLs
   */
  async getBatchDownloadUrls(bucket, keys, expiresIn = 3600) {
    try {
      const urlPromises = keys.map((key) =>
        this.getDownloadUrl(bucket, key, expiresIn)
      );
      const urls = await Promise.all(urlPromises);
      return Object.fromEntries(keys.map((key, index) => [key, urls[index]]));
    } catch (error) {
      throw new Error(
        `Failed to generate batch download URLs: ${error.message}`
      );
    }
  }
}

module.exports = S3UrlGenerator;
