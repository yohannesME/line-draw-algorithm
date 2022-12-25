<template>
  <div class="bg-[#242933] h-screen flex flex-col items-center">
    <h1 class="text-2xl text-center font-bold py-4"
      >The Digital Differential Analyzer(DDA) Line Drawing Algorithm</h1
    >
    <div class="flex gap-4">
      <div class="first flex flex-col gap-4">
        <div class="form-control">
          <label class="input-group input-group-md">
            <span>X1</span>
            <input
              type="number"
              placeholder="Type here"
              v-model="x1"
              class="input input-bordered input-md"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md">
            <span>Y1</span>
            <input
              type="number"
              placeholder="Type here"
              v-model="y1"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div class="second flex flex-col gap-4">
        <div class="form-control">
          <label class="input-group input-group-md">
            <span>X2</span>
            <input
              type="number"
              placeholder="Type here"
              v-model="x2"
              class="input input-bordered input-md"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="input-group input-group-md">
            <span>Y2</span>
            <input
              type="number"
              placeholder="Type here"
              v-model="y2"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="speed w-full flex flex-col items-center py-4">
      <span class="text-lg">Choose Speed</span>
      <div class="flex flex-col w-1/2">
        <input
          type="range"
          min="100"
          max="9000"
          class="range"
          v-model="speed"
        />
        <div class="w-full flex justify-between text-xs px-2">
          <span>Faster</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>Slower</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-4">
      <span class="text-lg">Calculate With:</span>
      <div class="flex gap-8">
        <span :class="{ lightup: isSlope, word: true }" @click="isSlope = true"
          >Slope Formula</span
        >
        <span
          :class="{ lightup: !isSlope, word: true }"
          @click="isSlope = false"
          >DDA Formula</span
        >
      </div>
      <button @click="generateGrid" class="btn btn-primary">Calculate</button>
    </div>

    <div class="flex gap-2 w-full h-full px-4 my-4">
      <div class="bg-[#2A303C] w-3/4 p-8">
        <h2 class="font-bold text-xl">Result:</h2>
        <div class="flex-y" v-for="y in grid">
          <p>write something</p>
          <div :class="{ 'flex-x': true, marked: x }" v-for="x in y"></div>
        </div>
      </div>
      <div class="steps bg-[#2A303C] w-1/4 p-8">
        <h2 class="font-bold text-xl">Steps Taken:</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x1: 1,
      y1: 1,
      x2: 5,
      y2: 1,
      grid: null,
      isSlope: true,
      speed: 1000,
    };
  },
  methods: {
    async drawGrid(step, xinc, yinc) {
      window.setTimeout(() => {}, 0);
      let tempx = this.x1;
      let tempy = this.y1;
      for (let i = 0; i < step + 1; i++) {
        await new Promise((resolve) => {
          setTimeout(resolve, this.speed);
        }).then(
          console.log(step, Math.round(tempy), Math.round(tempx), yinc, xinc),
          (this.grid[Math.round(tempy)][Math.round(tempx)] = true)
        );
        tempx += xinc;
        tempy += yinc;
      }
    },

    generateGrid() {
      let largex = this.y1 > this.y2 ? this.y1 : this.y2;
      largex += 1;
      this.grid = new Array(largex);

      let largey = this.x1 > this.x2 ? this.x1 : this.x2;
      largey += 1;
      for (let i = 0; i < largex; i++) {
        this.grid[i] = new Array(largey);
      }
      let dx = this.x2 - this.x1;
      let dy = this.y2 - this.y1;

      let step = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
      let slope = dy / dx;
      let yinc = 0;
      let xinc = 0;
      if (!this.isSlope) {
        yinc = dy / step;
        xinc = dx / step;
      } else {
        if (Math.abs(slope) > 1) {
          xinc = 1 / slope;
          yinc = 1;
        } else {
          xinc = 1;
          yinc = slope;
        }
      }

      this.drawGrid(step, xinc, yinc);
    },
  },
};
</script>

<style scoped></style>
