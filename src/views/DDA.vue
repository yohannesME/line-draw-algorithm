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

    <div class="flex gap-2 w-full h-fit px-4 my-4">
      <div class="bg-[#2A303C] w-3/4 p-8 h-fit">
        <h2 class="font-bold text-xl">Result:</h2>
        <div class="w-full h-fit">
          <div class="flex pl-5">
            <div
              v-if="showSteps"
              class="w-6 h-6 flex items-center justify-center"
              v-for="(i, index) in grid[0]"
            >
              {{ index }}
            </div>
          </div>

          <div class="flex" v-for="(y, index) in grid">
            <!-- <span>{{ y }}</span> -->
            <div class="flex w-6 h-6">{{ index }}</div>
            <div
              :class="{ marked: x }"
              class="w-6 h-6 bg-white border border-[#6419E6]"
              v-for="(x, index) in y"
            ></div>
            <div v-if="y == grid.length - 1">
              <h2 class="font-bold text-xl">Finished Rendering!!</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="steps bg-[#2A303C] w-1/4 p-8 flex flex-col overflow-y-auto">
        <h2 class="font-bold text-xl">Steps Taken:</h2>
        <div v-if="showSteps">
          <p>Original X: {{ x1 }}</p>
          <p>Original Y: {{ y1 }}</p>
          <p>Change in X: {{ dx }}</p>
          <p>Change in Y: {{ dy }}</p>
          <p>Slope: {{ slope }}</p>
          <p>Steps Taken: {{ step }}</p>
          <p
            >X-increment: Change in X/Steps Taken = {{ dx }}/{{ step }} =
            {{ Math.round(xinc) }}</p
          >
          <p
            >Y-increment: Change in Y/Steps Taken = {{ dy }}/{{ step }} =
            {{ Math.round(yinc) }}</p
          >
          <p>Steps (Numbers are Rounded):</p>
          <div v-for="(step, index) in steps">
            <p>Step {{ index + 1 }}</p>
            <p v-if="index == 0"
              >X Value = X + X-inrement = {{ x1 }} + {{ xinc }} =
              {{ Math.round(step[0]) }}</p
            >
            <p v-else
              >X Value = X + X-inrement {{ steps[index - 1][0] }} + {{ xinc }} =
              {{ Math.round(step[0]) }}</p
            >
            <p v-if="index == 0"
              >Y Value = Y + Y-inrement = {{ y1 }} + {{ yinc }} =
              {{ Math.round(step[1]) }}</p
            >
            <p v-else
              >Y Value = Y + Y-increment = {{ steps[index - 1][1] }} +
              {{ yinc }} = {{ Math.round(step[1]) }}</p
            >
          </div>
        </div>
        <p></p>
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
      dx: 0,
      dy: 0,
      xinc: 0,
      yinc: 0,
      slope: 0,
      step: 0,
      tempx: 0,
      tempy: 0,
      isSlope: true,
      speed: 1000,
      showSteps: false,
      steps: [],
    };
  },
  methods: {
    async drawGrid() {
      window.setTimeout(() => {}, 0);
      this.tempx = this.x1;
      this.tempy = this.y1;
      for (let i = 0; i < this.step + 1; i++) {
        await new Promise((resolve) => {
          setTimeout(resolve, this.speed);
        }).then(
          console.log(
            this.step,
            Math.round(this.tempy),
            Math.round(this.tempx),
            this.yinc,
            this.xinc
          ),
          (this.grid[Math.round(this.tempy)][Math.round(this.tempx)] = true)
        );
        this.steps.push([this.tempx, this.tempy]);
        this.tempx += this.xinc;
        this.tempy += this.yinc;
      }
    },

    generateGrid() {
      this.grid = null;
      this.showSteps = true;
      let largex = this.y1 > this.y2 ? this.y1 : this.y2;
      largex += 1;
      this.grid = new Array(largex);

      let largey = this.x1 > this.x2 ? this.x1 : this.x2;
      largey += 1;
      for (let i = 0; i < largex; i++) {
        this.grid[i] = new Array(largey);
      }
      this.dx = this.x2 - this.x1;
      this.dy = this.y2 - this.y1;

      this.step =
        Math.abs(this.dx) > Math.abs(this.dy)
          ? Math.abs(this.dx)
          : Math.abs(this.dy);
      this.slope = this.dy / this.dx;
      // let yinc = 0;
      // let xinc = 0;
      if (!this.isSlope) {
        this.yinc = this.dy / this.step;
        this.xinc = this.dx / this.step;
      } else {
        if (Math.abs(this.slope) > 1) {
          this.xinc = 1 / this.slope;
          this.yinc = 1;
        } else {
          this.xinc = 1;
          this.yinc = this.slope;
        }
      }

      this.drawGrid();
    },
  },
};
</script>

<style scoped>
.marked {
  background-color: #6419e6;
}
</style>
