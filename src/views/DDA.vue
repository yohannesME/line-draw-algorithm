<template>
  <div class="bg-[#242933] min-h-screen flex flex-col items-center">
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
          <span>Slower</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>Faster</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-4">
      <span class="text-lg">Calculate With:</span>
      <div class="flex gap-8">
        <span
          :class="{ lightup: isSlope, word: true }"
          class="cursor-pointer"
          @click="isSlope = true"
          >Slope Formula</span
        >
        <span
          :class="{ lightup: !isSlope, word: true }"
          class="cursor-pointer"
          @click="isSlope = false"
          >DDA Formula</span
        >
      </div>
      <button @click="generateGrid" class="btn btn-primary">Calculate</button>
    </div>

    <div class="flex gap-2 w-full h-fit px-4 my-4">
      <div class="bg-[#2A303C] w-3/4 p-8 h-max-fit">
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
      <div class="steps bg-[#2A303C] w-1/4 p-8 overflow overflow-y-scroll">
        <div class="flex flex-col">
          <h2 class="font-bold text-xl">Steps Taken:</h2>
          <div v-if="showSteps">
            <p
              ><i>Original X:</i> <b>{{ x1 }}</b></p
            >
            <p
              ><i>Original Y:</i> <b>{{ y1 }}</b></p
            >
            <p
              ><i>Change in X:</i> <b>{{ dx }}</b></p
            >
            <p
              ><i>Change in Y:</i> <b>{{ dy }}</b></p
            >
            <p
              ><i>Slope:</i> <b>{{ slope }}</b></p
            >
            <p
              ><i>Steps Taken:</i> <b>{{ step }}</b></p
            >
            <p v-if="!isSlope"
              ><i>X-increment:</i> Change in X/Steps Taken = {{ dx }}/{{
                step
              }}
              = <b>{{ Math.round(xinc) }}</b></p
            >
            <div v-else>
              <p v-if="Math.abs(slope) > 1">
                ><i>X-increment:</i> 1/Slope = 1/{{ slope }} =
                <b>{{ Math.round(xinc) }}</b></p
              >
              <p v-else>
                <i>X-increment:</i> 1 = {{ xinc }} =
                <b>{{ Math.round(xinc) }}</b></p
              ></div
            >
            <p v-if="!isSlope"
              ><i>Y-increment:</i> Change in Y/Steps Taken = {{ dy }}/{{
                step
              }}
              = <b>{{ Math.round(yinc) }}</b></p
            >
            <div v-else>
              <p v-if="Math.abs(slope) > 1"
                ><i>Y-increment:</i> 1 = {{ yinc }} =
                <b>{{ Math.round(yinc) }}</b></p
              >
              <p v-else
                ><i>Y-increment:</i> Slope = {{ slope }} =
                <b>{{ Math.round(yinc) }}</b></p
              >
            </div>
            <p class="py-2"><b>Steps (Numbers are Rounded):</b></p>
            <div v-for="(step, index) in steps" class="py-2">
              <p>Step {{ index + 1 }}</p>
              <p v-if="index == 0"
                ><i>X Value</i> = X + X-inrement = {{ x1 }} + {{ xinc }} =
                <b>{{ Math.round(step[0]) }}</b></p
              >
              <p v-else
                ><i>X Value</i> = X + X-inrement = {{ steps[index - 1][0] }} +
                {{ xinc }} = <b>{{ Math.round(step[0]) }}</b></p
              >
              <p v-if="index == 0"
                ><i>Y Value</i> = Y + Y-inrement = {{ y1 }} + {{ yinc }} =
                <b>{{ Math.round(step[1]) }}</b></p
              >
              <p v-else
                ><i>Y Value</i> = Y + Y-increment = {{ steps[index - 1][1] }} +
                {{ yinc }} = <b>{{ Math.round(step[1]) }}</b></p
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
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
          setTimeout(resolve, 10000 - this.speed);
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
.steps {
  max-height: inherit;
}
.lightup {
  color: yellow;
}
</style>
