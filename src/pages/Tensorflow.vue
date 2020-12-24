<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="mt-4 text-2xl text-center">Tensorflow Object Detection</h1>
      <div class="flex flex-wrap justify-center mt-4">
        <div class="w-full text-center">
          <button
            v-if="!isStreaming"
            class="px-4 py-2 mx-auto my-4 border rounded shadow hover:bg-blue-300 hover:text-white"
            @click="openCamera"
          >
            Open Camera
          </button>
          <div v-else>
            <button
              class="px-4 py-2 mx-auto my-4 border rounded shadow hover:bg-blue-300 hover:text-white"
              @click="stopStreaming"
            >
              Close Camera
            </button>
            <button
              class="px-4 py-2 mx-auto my-4 border rounded shadow hover:bg-blue-300 hover:text-white"
              @click="snapshot"
            >
              Snapshot
            </button>
          </div>
        </div>
        <video ref="videoRef" autoplay="true" width="200" class="m-auto" />
      </div>
      <div class="flex justify-center">
        <img
          ref="imgRef"
          src="https://4.imimg.com/data4/WC/JK/MY-18507846/gsm-mobile-phone-250x250.jpg"
          alt="mobile"
          width="200"
          crossorigin="anonymous"
          class="m-auto"
        />
      </div>
      <div class="flex justify-center">
        <button
          v-if="!isLoading"
          class="px-4 py-2 m-auto border rounded shadow hover:bg-blue-300 hover:text-white"
          @click="detect"
        >
          Detect
        </button>
        <button
          v-else
          class="px-4 py-2 m-auto border rounded shadow"
          @click="detect"
        >
          ⏳ &nbsp;Detecting...
        </button>
      </div>
      <div v-if="result.length > 0" class="w-full text-center">
        <p>{{ result }}</p>
      </div>
    </div>
  </section>
</template>

<script>
require("@tensorflow/tfjs-backend-webgl");
require("@tensorflow/tfjs-backend-cpu");
const cocoSsd = require("@tensorflow-models/coco-ssd");
import { ref } from "vue";
export default {
  setup() {
    const imgRef = ref("");
    const result = ref("");
    const videoRef = ref("");
    const isLoading = ref(false);
    const isStreaming = ref(false);

    const openCamera = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind == "videoinput"
        );
        console.log(devices);
        if (videoDevices.length === 1) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              videoRef.value.srcObject = stream;
            });
          isStreaming.value = true;
        }
        if (videoDevices.length > 1) {
          const cameraId = videoDevices[0].deviceId;
          navigator.mediaDevices
            .getUserMedia({ video: { deviceId: { exact: cameraId } } })
            .then((stream) => {
              videoRef.value.srcObject = stream;
            });
          isStreaming.value = true;
        } else {
          console.log("no devices available");
        }
      }
    };

    const stopStreaming = async () => {
      const tracks = videoRef.value.srcObject.getTracks();
      tracks.map((track) => track.stop());
      isStreaming.value = false;
    };

    const detect = async () => {
      isLoading.value = true;
      const img = imgRef.value;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value = predictions[0].class;
      isLoading.value = false;
    };

    const snapshot = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.value, 0, 0, 200, 200);
      const data = canvas.toDataURL("image/png");
      imgRef.value.setAttribute("src", data);
      isStreaming.value = false;
    };

    return {
      isStreaming,
      isLoading,
      imgRef,
      result,
      openCamera,
      videoRef,
      detect,
      stopStreaming,
      snapshot,
    };
  },
};
</script>

<style></style>
