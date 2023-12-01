<template>
  <div>
    <div class="file-upload">
      <v-file-input
        v-model="selectedFile"
        accept=".pdf,.txt"
        @change="uploadFile"
        label="Upload File"
      ></v-file-input>
      <div v-if="uploadedFiles.length > 0">
        <h2>Uploaded Documents:</h2>
        <div class="file-cards">
          <v-card
            v-for="(file, index) in uploadedFiles"
            :key="index"
            class="file-card"
          >
            <v-card-title>{{ file.name }}</v-card-title>
            <v-card-actions class="card-actions">
              <a :href="file.url" target="_blank">View</a>
              <v-btn @click="deleteFile(index)" text color="error">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <v-btn @click="processFile" color="success">Process File</v-btn>
        <v-btn @click="deleteAllFiles" color="error">Delete All Files</v-btn>
      </div>
    </div>
    <div class="results" v-if="chat_1 && chat_2">
      <p>{{chat_1}}</p>
      <p>{{chat_2}}</p>
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        uploadedFiles: [],
        chat_1: '',
        chat_2: ''
      };
    },
    created(){
    },
    methods: {
      async uploadFile() {
        if (!this.selectedFile) return;
        const uploadedFile = {
          name: this.selectedFile.name,
          url: URL.createObjectURL(this.selectedFile),
        };
        this.uploadedFiles.push(uploadedFile);
      },
      async processFile() {
        if (!this.selectedFile) return;
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        try {
          // const response = await axios.post('/api/process-file', formData);
          // console.log('File processed successfully', response);
          const response_chat = await axios.post('/api/_swk/py/upload', formData);
          this.chat_1 = response_chat.data.chat_1;
          this.chat_2 = response_chat.data.chat_2;
        } catch (error) {
          console.error('Error processing file', error);
        }
      },
      deleteFile(index) {
        this.uploadedFiles.splice(index, 1);
      },
      deleteAllFiles() {
        this.uploadedFiles = [];
      },
    },
  };
  </script>
  
  <style scoped>
  .file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 2px dashed #ccc;
    background-color: #f5f5f5;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .file-upload:hover {
    background-color: #f0f0f0;
  }
  
  .file-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .file-card {
    max-width: 300px;
    margin: 10px;
  }
  
  .card-actions {
    display: flex;
    justify-content: space-between;
  }
  .results{
    white-space: pre-line;
  }
  </style>
  