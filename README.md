# 🌐 Welcome to **S3 URL Generator**

S3 URL Generator simplifies the process of creating secure, pre-signed URLs for AWS S3 uploads and downloads. Whether you're working on file uploads, downloads, or batch operations, this package streamlines your workflow.

## 🌟 Features

- **Secure Upload & Download URLs:** Generate pre-signed URLs with ease.
- **Batch URL Generation:** Create multiple download links in one go.
- **Customizable Options:** Tailor URLs for your specific use cases.
- **Easy Integration:** Simple API designed for developers.

## 📦 Installation

Install the package via npm:

```bash
npm install s3-url-generator
```

## 🛠 Usage

Here’s how to use the S3 URL Generator:

```javascript
const S3UrlGenerator = require('s3-url-generator');

// Initialize with AWS configuration
const urlGenerator = new S3UrlGenerator({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_KEY',
  },
});

// Generate a download URL
const getDownloadUrl = async () => {
  try {
    const url = await urlGenerator.getDownloadUrl(
      'my-bucket',
      'path/to/file.pdf'
    );
    console.log('Download URL:', url);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Generate an upload URL
const getUploadUrl = async () => {
  try {
    const url = await urlGenerator.getUploadUrl(
      'my-bucket',
      'path/to/upload.jpg',
      'image/jpeg'
    );
    console.log('Upload URL:', url);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Generate multiple download URLs
const getBatchUrls = async () => {
  try {
    const urls = await urlGenerator.getBatchDownloadUrls('my-bucket', [
      'file1.pdf',
      'file2.jpg',
      'file3.png',
    ]);
    console.log('Batch URLs:', urls);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 📜 License

S3 URL Generator is licensed under the MIT License. See the [LICENSE](https://github.com/ridhamz/s3-url-generator/blob/main/LICENSE) file for details.

## 🧩 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes and submit a pull request.

Check out our [contribution guidelines](https://github.com/ridhamz/s3-url-generator/blob/main/CONTRIBUTING.md) for more details.

---

**Built with ❤️ by [Ridhamz](https://github.com/ridhamz)**
