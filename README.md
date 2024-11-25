# Medical Imaging App


The **Medical Imaging App** is a modern web application designed to handle medical images such as DICOM files. It offers features for image manipulation DICOM metadata display and real-world measurement conversions. Built with Nuxt 3, the app leverages cutting-edge tools for seamless functionality.

---

## Features


### Core Features
- **Image Manipulation Tools**:
  - Cropping
  - Zooming
- **DICOM Image Handling**:
  - Upload and view DICOM images
  - Display metadata (e.g., patient name, study date)


---

## Installation

### Prerequisites
- **Node.js**: v16 or higher
- **npm**: v7 or higher

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/deveshgoyal1000/nuxtapp.git
    cd medical-imaging-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to:
    ```bash
    http://localhost:3000
    ```

---

## Usage

1. **Upload DICOM or other medical image formats** using the app's upload interface.
2. Use the **toolbar** for image manipulation:
   - Zoom in/out
3. View **DICOM metadata** for uploaded medical images.

---

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3
- **Libraries**:
  - `cornerstone-core` and `cornerstone-tools` for DICOM image handling
  - `cropperjs` for image cropping
  - `dicom-parser` for parsing DICOM metadata
- **UI**: Tailwind CSS, Naive UI

- **State Management**: Pinia


---
