// app/services/file-storage.js
import Service from '@ember/service';

export default class FileStorageService extends Service {
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async storeFile(agent_name, file) {
    try {
      const base64Data = await this.fileToBase64(file);
      localStorage.setItem(agent_name, base64Data);
      console.log('File stored successfully.');
    } catch (error) {
      console.error('Error storing file:', error);
    }
  }

  retrieveFile(agent_name) {
    const base64Data = localStorage.getItem(agent_name);
    if (base64Data) {
      // Convert base64 data back to file format
      const blob = atob(base64Data.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(blob.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < blob.length; i++) {
        uint8Array[i] = blob.charCodeAt(i);
      }
      const file = new Blob([arrayBuffer], {
        type: 'application/octet-stream',
      });
      console.log('File retrieved from local storage:', file);
      return file;
    } else {
      console.warn('No file found in local storage.');
      return null;
    }
  }
}
